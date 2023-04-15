import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class AwsNetworkingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create vpc
    const vpc = new ec2.Vpc(this, 'VPC', {
      ipAddresses: ec2.IpAddresses.cidr('10.1.0.0/16'),
      vpcName: "CDK-VPC",
      natGateways: 0,
      natGatewaySubnets: {
        subnetType: ec2.SubnetType.PUBLIC
      }
    });

    // EC2インスタンスを作成する
    const ec2Instance = new ec2.Instance(this, 'EC2Instance', { 
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
      keyName: 'WindowsKey',
    });
  }
}
