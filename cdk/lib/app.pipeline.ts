import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  AccountPrincipal,
  Effect,
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
  Role,
} from "aws-cdk-lib/aws-iam";
import {
  CodePipeline,
  CodePipelineActionFactoryResult,
  CodePipelineSource,
  ICodePipelineActionFactory,
  ProduceActionOptions,
  ShellStep,
  Step,
} from "aws-cdk-lib/pipelines";
import { AppStage } from "./app.stage";
import { Environment } from "./environment";
import { Artifact, IStage } from "aws-cdk-lib/aws-codepipeline";
import { CodeDeployServerDeployAction } from "aws-cdk-lib/aws-codepipeline-actions";
import {
  ServerApplication,
  ServerDeploymentGroup,
} from "aws-cdk-lib/aws-codedeploy";

export class AppPipeline extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const githubConnectionArn = this.node.tryGetContext("githubConnectionArn");

    const shell = new ShellStep("ShellStep", {
      input: CodePipelineSource.connection(
        "declanprice/private-universe-tech",
        "main",
        { connectionArn: githubConnectionArn },
      ),
      installCommands: [
        "cd cdk",
        "npm install",
        "cd ..",
        "cd app",
        "npm install",
        "cd ..",
      ],
      commands: [
        "cd cdk",
        "npm run cdk synth -- --output ../cdk.out",
        "cd ..",
        "cd app",
        "npx prisma generate",
        "npm run build",
      ],
    });

    shell.addOutputDirectory("app");

    const pipeline = new CodePipeline(this, "CodePipeline", {
      synth: shell,
      selfMutation: false,
    });

    const environments = this.node.tryGetContext("environments");

    // if you have a multi environment setup, simply add a new environment key to cdk.json 'environments' object.

    for (const name in environments) {
      const environment = environments[name] as Environment;

      const stage = pipeline.addStage(
        new AppStage(this, "AppStage", {
          environment,
        }),
      );

      stage.addPost(new CodeDeployStep(this));
    }
  }
}

class CodeDeployStep extends Step implements ICodePipelineActionFactory {
  constructor(readonly scope: Construct) {
    super("CodeDeployStep");

    this.discoverReferencedOutputs({
      env: {
        /* ... */
      },
    });
  }

  public produceAction(
    stage: IStage,
    options: ProduceActionOptions,
  ): CodePipelineActionFactoryResult {
    stage.addAction(
      new CodeDeployServerDeployAction({
        actionName: "Deploy",
        role: new Role(this.scope, "PrivateUniverseCodeDeployRole", {
          roleName: "PrivateUniverseCodeDeployRole",
          assumedBy: new AccountPrincipal(Stack.of(this.scope).account),
          managedPolicies: [
            ManagedPolicy.fromAwsManagedPolicyName(
              "AWSCodeDeployDeployerAccess",
            ),
          ],
          inlinePolicies: {
            policy: new PolicyDocument({
              statements: [
                new PolicyStatement({
                  effect: Effect.ALLOW,
                  resources: ["*"],
                  actions: ["*"],
                }),
              ],
            }),
          },
        }),
        input: new Artifact("ShellStep_app"),
        deploymentGroup:
          ServerDeploymentGroup.fromServerDeploymentGroupAttributes(
            this.scope,
            "PrivateUniverseServerDeploymentGroup",
            {
              deploymentGroupName: "PrivateUniverseServerDeploymentGroup",
              application: ServerApplication.fromServerApplicationName(
                this.scope,
                "PrivateUniverseServerApplication",
                "PrivateUniverseServerApplication",
              ),
            },
          ),
        runOrder: 3,
      }),
    );

    return { runOrdersConsumed: 1 };
  }
}
