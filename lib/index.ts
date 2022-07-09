import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface HttpLambdaProps {
  // Define construct properties here
}

export class HttpLambda extends Construct {

  constructor(scope: Construct, id: string, props: HttpLambdaProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'HttpLambdaQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
