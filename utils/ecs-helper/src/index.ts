import {
  ECSClient,
  RunTaskCommand,
  DescribeTasksCommand,
  waitUntilTasksRunning,
  StopTaskCommand,
} from "@aws-sdk/client-ecs";
import {
  EC2Client,
  DescribeNetworkInterfacesCommand,
} from "@aws-sdk/client-ec2";

export class Cluster {
  private region: string;
  private ARN: string;

  constructor(ARN: string, region: string) {
    this.ARN = ARN;
    this.region = region;
  }

  createTask = (
    subnets: string[],
    securityGroups: string[],
    definition: string
  ) => {
    return new Task(this, subnets, securityGroups, definition);
  };

  getARN = () => {
    return this.ARN
  }

  getRegion = () => {
    return this.region
  }
}

export class Task {
  private definition: string;
  private subnets: string[];
  private client: ECSClient;
  private ARN: string | undefined;
  private ENI: string | undefined;
  private publicIP: string | undefined;
  private cluster: Cluster;
  private securityGroups: string[];

  constructor(
    cluster: Cluster,
    subnets: string[],
    securityGroups: string[],
    definition: string
  ) {
    this.cluster = cluster;
    this.subnets = subnets;
    this.securityGroups = securityGroups;
    this.client = new ECSClient({ region: this.cluster.getRegion() });
    this.definition = definition;
  }

  private start = async () => {
    const command = new RunTaskCommand({
      cluster: this.cluster.getARN(),
      taskDefinition: this.definition,
      launchType: "FARGATE",
      networkConfiguration: {
        awsvpcConfiguration: {
          assignPublicIp: "ENABLED",
          subnets: this.subnets,
          securityGroups: this.securityGroups,
        },
      },
    });
    const result = await this.client.send(command);
    const ARN = result.tasks?.[0].taskArn;
    if (!ARN) {
      throw new Error("Could not get ARN");
    }
    this.ARN = ARN;
  };

  getPublicIP = () => {
    if (!this.publicIP) {
      throw new Error("Could not get Public IP");
    }
    return this.publicIP;
  };

  private setPublicIP = async () => {
    if (!this.ENI) {
      return undefined;
    }
    const client = new EC2Client({ region: "us-east-2" });
    const command = new DescribeNetworkInterfacesCommand({
      NetworkInterfaceIds: [this.ENI],
    });
    const networkInfo = await client.send(command);
    const publicIP = networkInfo.NetworkInterfaces?.[0].Association?.PublicIp;
    if (!publicIP) {
      throw new Error("Could not get Public IP");
    }
    this.publicIP = publicIP;
  };

  private setENI = async () => {
    if (!this.ARN) {
      return undefined;
    }
    const command = new DescribeTasksCommand({
      cluster: this.cluster.getARN(),
      tasks: [this.ARN],
    });
    const result = await this.client.send(command);
    const ENI = result.tasks?.[0].attachments?.[0].details?.[1].value;
    if (!ENI) {
      throw new Error("Could not get ENI");
    }
    this.ENI = ENI;
  };

  wait = async () => {
    await this.start();
    if (!this.ARN) {
      throw new Error("Could not get ARN");
    }
    try {
      await waitUntilTasksRunning(
        { client: this.client, maxWaitTime: 600, maxDelay: 1, minDelay: 1 },
        {
          cluster: this.cluster.getARN(),
          tasks: [this.ARN],
        }
      );
    } catch (error) {
      await this.stop("Error when waiting for task to run");
      throw error;
    }
    await this.setENI();
    await this.setPublicIP();
  };

  stop = async (reason: string) => {
    if (!this.ARN) {
      return undefined;
    }
    const command = new StopTaskCommand({
      cluster: this.cluster.getARN(),
      reason: reason,
      task: this.ARN,
    });
    await this.client.send(command);
  };
}
