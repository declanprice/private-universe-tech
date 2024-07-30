import { Stack, Tags } from "aws-cdk-lib";
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
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  Peer,
  Port,
  SecurityGroup,
  UserData,
  Vpc,
} from "aws-cdk-lib/aws-ec2";
import { Environment } from "./environment";

type ComputeResourcesProps = {
  environment: Environment;
};

export class ComputeResources extends Construct {
  constructor(scope: Construct, id: string, props: ComputeResourcesProps) {
    super(scope, id);

    const defaultVpc = Vpc.fromLookup(this, "DefaultVpc", { isDefault: true });

    const instanceSecurityGroup = new SecurityGroup(
      this,
      "PrivateUniverseInstanceSecurityGroup",
      {
        vpc: defaultVpc,
        securityGroupName: "PrivateUniverseInstanceSecurityGroup",
        allowAllOutbound: true,
      },
    );

    instanceSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(3000));

    const instanceRole = new Role(this, "PrivateUniverseInstanceRole", {
      roleName: "PrivateUniverseInstanceRole",
      assumedBy: new AccountPrincipal(Stack.of(this).account),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AmazonEC2RoleforAWSCodeDeploy",
        ),
      ],
      inlinePolicies: {
        policy: new PolicyDocument({
          statements: [
            new PolicyStatement({
              effect: Effect.ALLOW,
              resources: [
                `arn:aws:ssm:${Stack.of(this).region}:${Stack.of(this).account}:parameter${props.environment.authSecretParamName}`,
                `arn:aws:ssm:${Stack.of(this).region}:${Stack.of(this).account}:parameter${props.environment.databaseParamName}`,
              ],
              actions: ["ssm:*"],
            }),
          ],
        }),
      },
    });

    const instance = new Instance(this, "PrivateUniverseInstance", {
      instanceName: "PrivateUniverseInstance",
      vpc: defaultVpc,
      role: instanceRole,
      securityGroup: instanceSecurityGroup,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      machineImage: MachineImage.latestAmazonLinux2023(),
      ssmSessionPermissions: true,
      userData: UserData.forLinux({
        shebang: "sudo yum install nodejs -y",
      }),
      associatePublicIpAddress: true,
      userDataCausesReplacement: true,
    });

    Tags.of(instance).add("project", "PrivateUniverse");
  }
}
