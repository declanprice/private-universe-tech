import {Stack} from "aws-cdk-lib";
import {Construct} from "constructs";
import {
    AccountPrincipal,
    AnyPrincipal,
    Effect,
    ManagedPolicy,
    PolicyDocument,
    PolicyStatement,
    Role
} from "aws-cdk-lib/aws-iam";
import {
    CodePipeline, CodePipelineActionFactoryResult,
    CodePipelineSource,
    ICodePipelineActionFactory,
    ProduceActionOptions,
    ShellStep,
    Step
} from "aws-cdk-lib/pipelines";
import {AppStage} from "../app.stage";
import {Environment} from "../environment";
import {Artifact, IStage} from "aws-cdk-lib/aws-codepipeline";
import {CodeDeployServerDeployAction} from "aws-cdk-lib/aws-codepipeline-actions";
import {ServerApplication, ServerDeploymentGroup} from "aws-cdk-lib/aws-codedeploy";

export class AppPipeline extends Stack {
    constructor(scope: Construct, id: string, props: any) {
        super(scope, id);

        const connectionArn = this.node.tryGetContext('connectionArn')

        const shell = new ShellStep('ShellStep', {
            input:  CodePipelineSource.connection('declanprice/private-universe-tech', 'main', { connectionArn }),
            installCommands: ['npm install', 'npm run build'],
            commands: ['npm run cdk synth', 'mv node_modules src'],
        });

        shell.addOutputDirectory('src');

        const pipeline = new CodePipeline(this, 'CodePipeline', {
            synth: shell,
            selfMutation: false,
            role: new Role(this, 'PrivateUniverseAppPipelineRole', {
                roleName: 'PrivateUniverseAppPipelineRole',
                assumedBy: new AccountPrincipal(this.account),
                inlinePolicies: {
                    'sts': new PolicyDocument({
                        statements: [
                            new PolicyStatement({
                                effect: Effect.ALLOW,
                                resources: ['*'],
                                actions: ['sts:AssumeRole']
                            })
                        ]
                    })
                }
            }),
        });

        const context = this.node.tryGetContext('environments');

        const environment = context['dev'] as Environment;

        const stage = pipeline.addStage(new AppStage(this, 'AppStage', {
            environment
        }));

        stage.addPost(new CodeDeployStep(this));
    }
}


class CodeDeployStep extends Step implements ICodePipelineActionFactory {
    constructor(
        readonly scope: Construct,
    ) {
        super('CodeDeployStep');

        this.discoverReferencedOutputs({
            env: { /* ... */ }
        });
    }

    public produceAction(stage: IStage, options: ProduceActionOptions): CodePipelineActionFactoryResult {
        stage.addAction(new CodeDeployServerDeployAction({
            actionName: 'Deploy',
            role: new Role(this.scope, 'PrivateUniverseCodeDeployRole', {
                roleName: 'PrivateUniverseCodeDeployRole',
                assumedBy: new AccountPrincipal(Stack.of(this.scope).account),
                managedPolicies: [
                    ManagedPolicy.fromManagedPolicyArn(this.scope, 'CodeDeployerAccess', 'arn:aws:iam::aws:policy/AWSCodeDeployDeployerAccess'),
                ],
            }),
            input: new Artifact('ShellStep_src'),
            deploymentGroup: ServerDeploymentGroup.fromServerDeploymentGroupAttributes(this.scope, 'PrivateUniverseServerDeploymentGroup', {
                deploymentGroupName: 'PrivateUniverseServerDeploymentGroup',
                application: ServerApplication.fromServerApplicationName(this.scope, 'PrivateUniverseServerApplication', 'PrivateUniverseServerApplication')
            }),
            runOrder: 3
        }));

        return { runOrdersConsumed: 1 };
    }
}

