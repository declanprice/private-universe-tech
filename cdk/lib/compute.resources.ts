import { Stack, Tags } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { AnyPrincipal, Effect, ManagedPolicy, PolicyDocument, PolicyStatement, Role } from 'aws-cdk-lib/aws-iam'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
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
} from 'aws-cdk-lib/aws-ec2'
import { Environment } from './environment'

type ComputeResourcesProps = {
    environment: Environment
}

export class ComputeResources extends Construct {
    constructor(scope: Construct, id: string, props: ComputeResourcesProps) {
        super(scope, id)

        const { environment } = props

        const defaultVpc = Vpc.fromLookup(this, 'DefaultVpc', { isDefault: true })

        const instanceSecurityGroup = new SecurityGroup(this, 'PrivateUniverseInstanceSecurityGroup', {
            vpc: defaultVpc,
            securityGroupName: 'PrivateUniverseInstanceSecurityGroup',
            allowAllOutbound: true,
        })

        instanceSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(443))
        instanceSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(3000))
        instanceSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(80))

        const instanceRole = new Role(this, 'PrivateUniverseInstanceRole', {
            roleName: 'PrivateUniverseInstanceRole',
            assumedBy: new AnyPrincipal(),
            managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonEC2RoleforAWSCodeDeploy')],
            inlinePolicies: {
                policy: new PolicyDocument({
                    statements: [
                        new PolicyStatement({
                            effect: Effect.ALLOW,
                            resources: [
                                `arn:aws:ssm:${Stack.of(this).region}:${Stack.of(this).account}:parameter${props.environment.authSecretParamName}`,
                                `arn:aws:ssm:${Stack.of(this).region}:${Stack.of(this).account}:parameter${props.environment.authUrlParamName}`,
                                `arn:aws:ssm:${Stack.of(this).region}:${Stack.of(this).account}:parameter${props.environment.databaseParamName}`,
                                `arn:aws:ssm:${Stack.of(this).region}:${Stack.of(this).account}:parameter${props.environment.fullDomainName}`,
                            ],
                            actions: ['ssm:*'],
                        }),
                    ],
                }),
            },
        })

        const userData = UserData.forLinux()
        userData.addCommands('yum -y update')
        userData.addCommands('yum -y install ruby')
        userData.addCommands('yum -y install wget')
        userData.addCommands('yum install nodejs -y')
        userData.addCommands('npm i -g pm2')
        userData.addCommands('wget https://aws-codedeploy-a' + 'p-southeast-2.s3-ap-southeast-2.amazonaws.com/latest/install')
        userData.addCommands('chmod +x ./install')
        userData.addCommands('./install auto')
        userData.addCommands('systemctl start codedeploy-agent')
        userData.addCommands(
            `curl "https://www.duckdns.org/update?domains=${environment.domainName}&token=$((aws ssm get-parameter --name ${environment.dnsTokenParamName} --region ${Stack.of(this).region} --query "Parameter.Value" --with-decryption)|jq -r)&ip=$(curl http://checkip.amazonaws.com)"`
        )
        userData.addCommands('yum install certbot -y')
        userData.addCommands('yum install nginx -y')
        userData.addCommands('yum install python3-certbot-nginx -y')
        userData.addCommands(`certbot certonly --nginx -d ${environment.fullDomainName} -m ${environment.domainEmail} --agree-tos -n`)
        userData.addCommands('fuser -k 80/tcp')
        userData.addCommands('fuser -k 443/tcp')
        userData.addCommands('systemctl start nginx')

        userData.addCommands(`echo export AUTH_URL_PARAM_NAME=${environment.authUrlParamName} >> /etc/environment`)
        userData.addCommands(`echo export AUTH_SECRET_PARAM_NAME=${environment.authSecretParamName} >> /etc/environment`)
        userData.addCommands(`echo export DATABASE_URL_PARAM_NAME=${environment.databaseParamName} >> /etc/environment`)
        userData.addCommands(`echo export FULL_DOMAIN_NAME=${environment.fullDomainName} >> /etc/environment`)

        const instance = new Instance(this, 'PrivateUniverseInstance', {
            instanceName: 'PrivateUniverseInstance',
            vpc: defaultVpc,
            role: instanceRole,
            securityGroup: instanceSecurityGroup,
            instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
            machineImage: MachineImage.latestAmazonLinux2023(),
            ssmSessionPermissions: true,
            userData: userData,
            userDataCausesReplacement: true,
            associatePublicIpAddress: true,
        })

        new StringParameter(this, 'PrivateUniverseAuthUrl', {
            parameterName: props.environment.authUrlParamName,
            stringValue: `https://${environment.fullDomainName}`,
        })

        Tags.of(instance).add('deployment', 'PrivateUniverse')
    }
}
