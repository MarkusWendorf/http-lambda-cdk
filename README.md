# HttpLambda CDK

A CDK construct for writing AWS Lambda functions that run a regular http server.

It consists of three parts:

1. an AWS lambda function
2. the [aws-lambda-web-adapter](https://github.com/awslabs/aws-lambda-web-adapter) extension
3. an API endpoint via [Lambda function URLs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html)

## Installation

```sh
npm install http-lambda-cdk
```

## Example

The only requirement for your web server is that it listens on port 8080.

Take this rust server for example:

```rust
use axum::{
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    routing::get,
    Router,
};

use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let port = 8080;
    let addr = SocketAddr::from(([127, 0, 0, 1], port));

    let app = Router::new().route("/", get(root));

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn root() -> impl IntoResponse {
    let mut headers = HeaderMap::new();
    headers.insert("Content-Type", "text/html".parse().unwrap());

    (StatusCode::OK, headers, "<h1>Hello World!</h1>")
}
```

## Deploy the web server

The following CDK stack shows how you would deploy our rust server to AWS Lambda (you can find the full example [here](https://github.com/MarkusWendorf/http-lambda-cdk/tree/master/examples/rust-example/cdk/lib/RustHttpStack.ts)):

```ts
import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { HttpLambda } from "http-lambda-cdk";

export class RustHttpStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const buildScript = path.join(process.cwd(), "..", "app", "build.sh");

    const { functionUrl } = new HttpLambda(this, "Lambda", {
      // see section 'Build script'
      buildScript,
      // 'bootstrap' is the name of our rust executable
      handler: "bootstrap",
      // our executable is compiled for ARM64
      architecture: lambda.Architecture.ARM_64,
      runtime: lambda.Runtime.PROVIDED_AL2,
      memorySize: 512,
      timeout: Duration.seconds(10),
    });

    new CfnOutput(this, "HttpEndpoint", {
      value: functionUrl.url,
    });
  }
}
```

## Build script

The construct expects you to define a build script that compiles your application.
While deploying, the construct will call the script with two parameters:

- $1: a path to a temporary directory, where the build script should copy its output to
- $2: the selected CPU architecture ("arm64" or "x86_64")

Your build script has to copy your application code to the path provided by the first parameter.

Take a look at this build script for our rust server ([build.sh](https://github.com/MarkusWendorf/http-lambda-cdk/tree/master/examples/rust-example/app/build.sh)):

```sh
# Exit on error
set -e

architecture=$2
if [[ $2 == "x86_64" ]]
then
  architecture=""
else 
  architecture="--arm64"
fi

# Use cargo lambda plugin to cross compile our app
cargo lambda build --release $architecture

# Copy application to the deployment folder
cp -r ./target/lambda/app/ $1
```

You can find a Node.js example [here](https://github.com/MarkusWendorf/http-lambda-cdk/tree/master/examples/nodejs-example/app/build.sh).

## How does it work

1. a new AWS lambda http event is triggered
2. the lambda starts the [aws-lambda-web-adapter](https://github.com/awslabs/aws-lambda-web-adapter) extension automatically
3. the lambda starts your http server defined by `handler`
4. the `aws-lambda-web-adapter` does a healthcheck on your server and waits for it to return http status 200. By default the extension will call `GET /`, but you can also [change it](#healthcheck-configuration) to be another path.
5. the `aws-lambda-web-adapter` receives the event and transforms the event to a http request and calls your http server on port 8080
6. your http server returns a http response
7. the `aws-lambda-web-adapter` transforms the response to the AWS lambda response format

## Healthcheck configuration

You can change the healthcheck path via the `READINESS_CHECK_PATH` environment variable:

```ts
new HttpLambda(this, "Lambda", {
  [...]
  environment: {
    READINESS_CHECK_PATH: "/healthcheck"
  }
});
```

## Troubleshooting

* ensure that `handler` is set to your executable / script file
* node.js scripts have to include a node [shebang](https://github.com/MarkusWendorf/http-lambda-cdk/blob/master/examples/nodejs-example/app/index.ts#L1)
* ensure that the `runtime` is node when running a node http server