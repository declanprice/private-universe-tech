import { Construct } from "constructs";
import {
  InstanceTagSet,
  ServerApplication,
  ServerDeploymentGroup,
} from "aws-cdk-lib/aws-codedeploy";
import { AnyPrincipal, ManagedPolicy, Role } from "aws-cdk-lib/aws-iam";

export class DeploymentResources extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const application = new ServerApplication(
      this,
      "PrivateUniverseServerApplication",
      {
        applicationName: "PrivateUniverseServerApplication",
      },
    );

    const group = new ServerDeploymentGroup(
      this,
      "PrivateUniverseServerDeploymentGroup",
      {
        application: application,
        deploymentGroupName: "PrivateUniverseServerDeploymentGroup",
        ec2InstanceTags: new InstanceTagSet({ project: ["PrivateUniverse"] }),
        role: new Role(this, "PrivateUniverseServerDeploymentRole", {
          roleName: "PrivateUniverseServerDeploymentRole",
          assumedBy: new AnyPrincipal(),
          managedPolicies: [
            ManagedPolicy.fromAwsManagedPolicyName(
              "service-role/AWSCodeDeployRole",
            ),
          ],
        }),
      },
    );
  }
}
