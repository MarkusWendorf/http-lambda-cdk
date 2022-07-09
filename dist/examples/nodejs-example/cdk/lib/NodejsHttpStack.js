"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodejsHttpStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const path = require("path");
const lambda = require("aws-cdk-lib/aws-lambda");
const lib_1 = require("../../../../lib");
class NodejsHttpStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const buildScript = path.join(process.cwd(), "..", "app", "build.sh");
        const { functionUrl } = new lib_1.HttpLambda(this, "Lambda", {
            buildScript,
            runtime: lambda.Runtime.NODEJS_16_X,
            architecture: lambda.Architecture.ARM_64,
            handler: "index.js",
            memorySize: 512,
            timeout: aws_cdk_lib_1.Duration.seconds(10),
        });
        new aws_cdk_lib_1.CfnOutput(this, "HttpEndpoint", {
            value: functionUrl.url,
        });
    }
}
exports.NodejsHttpStack = NodejsHttpStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZWpzSHR0cFN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZXhhbXBsZXMvbm9kZWpzLWV4YW1wbGUvY2RrL2xpYi9Ob2RlanNIdHRwU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXFFO0FBRXJFLDZCQUE2QjtBQUM3QixpREFBaUQ7QUFDakQseUNBQTZDO0FBRTdDLE1BQWEsZUFBZ0IsU0FBUSxtQkFBSztJQUN4QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFdEUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksZ0JBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ3JELFdBQVc7WUFDWCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU07WUFDeEMsT0FBTyxFQUFFLFVBQVU7WUFDbkIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsc0JBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQzlCLENBQUMsQ0FBQztRQUVILElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxXQUFXLENBQUMsR0FBRztTQUN2QixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuQkQsMENBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2ZuT3V0cHV0LCBEdXJhdGlvbiwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgSHR0cExhbWJkYSB9IGZyb20gJy4uLy4uLy4uLy4uL2xpYic7XG5cbmV4cG9ydCBjbGFzcyBOb2RlanNIdHRwU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgYnVpbGRTY3JpcHQgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCIuLlwiLCBcImFwcFwiLCBcImJ1aWxkLnNoXCIpO1xuXG4gICAgY29uc3QgeyBmdW5jdGlvblVybCB9ID0gbmV3IEh0dHBMYW1iZGEodGhpcywgXCJMYW1iZGFcIiwge1xuICAgICAgYnVpbGRTY3JpcHQsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTZfWCxcbiAgICAgIGFyY2hpdGVjdHVyZTogbGFtYmRhLkFyY2hpdGVjdHVyZS5BUk1fNjQsXG4gICAgICBoYW5kbGVyOiBcImluZGV4LmpzXCIsXG4gICAgICBtZW1vcnlTaXplOiA1MTIsXG4gICAgICB0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDEwKSxcbiAgICB9KTtcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJIdHRwRW5kcG9pbnRcIiwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uVXJsLnVybCxcbiAgICB9KTtcbiAgfVxufVxuIl19