## Welcome to the puppy pictionary tech test.

### Insights into technical choices made when completing tech test.

The pipeline and infrastructure cloudformation stack is set up so that at any given time the stack can be torn down and up again without
any manual work required to get the app working end to end.

There are no hard coded values in the app / cloudformation it's all configured from ssm parameter store secret values based on the
deployment environment (parameter store param names are configured in cdk.json to allow for a multi environment setup)

## App

- App is split up into top level "modules" (auth, dogs, profile, profile-setup)  These modules can contain module specific component sub folders but never shared components across modules.


- Main modules (profile, dogs) uses a shared app layout component which is protected by a guard that ensures user is logged in. (I opted to use client side code to handle this but understand middleware is a valid option also) 


- Shared folder is used by both client/server code. It has things like types, validation schemas & components that are used in multiple places. 


- NextAuth, i understand MagicLinks and OpenID auth is favoured for security but thought it would be fun to implement old school email/password solution instead.


- Profile setup modal, i opted to implement a multistep form within a single component which validates fields at each step as a way to demonstrate an understanding of how to implement slightly more complicated form use cases.

## Pipeline & Infrastructure

All secret parameters are pre-configured in SSM Parameter Store.

All iam permissions are least privilege access.

AWS Codepipeline Steps:

1. Pipeline triggers from changes to main branch in source repository.


2. Codebuild builds the Next.js app.


3. Cloudformation deploys the infrastructure stack (ec2, security rules, iam roles & code deploy resources).


4. Code deploy deploys the build assets to the deployed ec2 instance.


5. Pm2 is used to manage the Next.js process ensuring the process is restarted when a transient failure occurs, nginx is configured as a reverse proxy to the running app.

As part of the ec2 instance set up the duck dns domain is configured to point to the instance public ip
and certibot is used to generate an ssl certificates for the domain automatically.

## Worthy Mentions

- No prior experience building or deploying Next.js.


- No prior experience with manual SSL configuration with LetsEncrypt.


- I handled some error / edge cases but not all as i don't think it is necessary for tech test.


- The tech test was completed whilst on the move travelling to and from the UK. I will take this time to blame jetlag for any potential oversights :)

Thanks for reading.