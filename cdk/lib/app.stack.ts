import { Stack, StackProps} from "aws-cdk-lib";
import { Construct } from "constructs";
import {ComputeResources} from "./compute.resources";
import {DeploymentResources} from "./deployment.resources";
import {Environment} from "./environment";

type AppStackProps = {
    environment: Environment;
} & StackProps;

export class AppStack extends Stack {
    constructor(scope: Construct, id: string, props: AppStackProps) {
        super(scope, id, {
            stackName: 'PrivateUniverseStack',
            env: {
                region: 'ap-southeast-2',
                account: '518424097895'
            }
        });

        new ComputeResources(this, 'ComputeResources', props);

        new DeploymentResources(this, 'DeploymentResources');
    }
}

