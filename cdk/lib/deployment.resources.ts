import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import {InstanceTagSet, ServerApplication, ServerDeploymentGroup} from "aws-cdk-lib/aws-codedeploy";

export class DeploymentResources extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const application = new ServerApplication(this, 'PrivateUniverseServerApplication', {
            applicationName: 'PrivateUniverseServerApplication',
        });

        const group = new ServerDeploymentGroup(this, 'PrivateUniverseServerDeploymentGroup', {
            deploymentGroupName: 'PrivateUniverseServerDeploymentGroup',
            ec2InstanceTags: new InstanceTagSet({project: ['PrivateUniverse']}),
            installAgent: true,
        })
    }
}

