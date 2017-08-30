![ej](https://www.kcoleman.me/images/avatar_images/ej.png)
![fg](https://www.kcoleman.me/images/avatar_images/fg.png)
![fy](https://www.kcoleman.me/images/avatar_images/fy.png)
![fz](https://www.kcoleman.me/images/avatar_images/fz.png)
![gz](https://www.kcoleman.me/images/avatar_images/gz.png)
![jp](https://www.kcoleman.me/images/avatar_images/jp.png)
![kc](https://www.kcoleman.me/images/avatar_images/kc.png)
![nz](https://www.kcoleman.me/images/avatar_images/nz.png)
![qr](https://www.kcoleman.me/images/avatar_images/qr.png)
![ru](https://www.kcoleman.me/images/avatar_images/ru.png)
![rw](https://www.kcoleman.me/images/avatar_images/rw.png)
![vn](https://www.kcoleman.me/images/avatar_images/vn.png)
![fl](https://www.kcoleman.me/images/avatar_images/fl.png)

# Letter Avatars with Serverless

The full tutorial on how to create this repository can be found here: 

<!-- TOC -->

- [Letter Avatars with Serverless](#letter-avatars-with-serverless)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
    - [Step 1. Deploy](#step-1-deploy)
    - [Step 2. Configure AWS Lambda](#step-2-configure-aws-lambda)
    - [Step 3. AWS Lambda Configuration](#step-3-aws-lambda-configuration)
      - [Step 3a. Enable Binary Support for API Gateway](#step-3a-enable-binary-support-for-api-gateway)
      - [Step 3b. Configure Lambda function permissions](#step-3b-configure-lambda-function-permissions)
      - [Step 3c. Re-deploy your app](#step-3c-re-deploy-your-app)
    - [Step 4. Test your endpoint](#step-4-test-your-endpoint)

<!-- /TOC -->

## Prerequisites

These need to be setup and configured on your machine:

 - [NodeJs v6.5.0 or later](https://nodejs.org/en/)
 - [AWS Lambda](https://aws.amazon.com/lambda/)
 - [Serverless framework](https://serverless.com/framework/docs/providers/aws/guide/quick-start/)
 - [npm - gm](https://www.npmjs.com/package/gm)

Use the respective links to learn how to configure these services.  GraphicsMagick is used to generate the png files for display.

## Quick Start
### Step 1. Deploy
For first time deployments, this may take a minute, because serverless need to configure your AWS account to add the lambda and api gateway services.

`$ serverless deploy -v`

Successful deploy output

```
  Sucessful deploy output:

      Service Information
      service: letter-avatar
      stage: dev
      region: us-east-1
      stack: letter-avatar-dev
      api keys:
        None
      endpoints:
        GET - https://{appId}.execute-api.us-east-1.amazonaws.com/dev/letterAvatar/{initials}
      functions:
        profilePic: letter-avatar-dev-profilePic
```

### Step 2. Configure AWS Lambda
Unfortunately, AWS does not support all of the configuration we need to do to get this working via their API yet.  So we will need to manually go into our aws console to continue our configurations.


### Step 3. AWS Lambda Configuration
Unfortunately, AWS does not support all of the configuration we need to do to get this working via their API yet.  So we will need to manually go into our AWS console to continue our configurations.

#### Step 3a. Enable Binary Support for API Gateway
Following this image, we need to add "*/*" to our binary media type.  API Gateway will look at the accept headers of the web request to determine whether or not to use the binary response.  If the accept headers don't exactly match what is listed here, the API will return JSON instead of our lovely png.  I opt for `*/*` because our API should always return a PNG, not matter what the accept headers are.

![AWS binary support](https://www.kcoleman.me/images/avatar_images/binary_support.png)

#### Step 3b. Configure Lambda function permissions
In the API Gateway page click "Resources" -> "GET" -> "Integration request"

![AWS resources](https://www.kcoleman.me/images/avatar_images/aws_resources.png)

Now click on the "pencil" icon next to the lambda function

![AWS edit](https://www.kcoleman.me/images/avatar_images/aws_edit.png)

and then click on the check box.  This will trigger an alert saying it needs to add a permission to AWS lambda.  Click ok, and continue.

![AWS check](https://www.kcoleman.me/images/avatar_images/aws_check.png)

Woot! That is it for the configuration.

#### Step 3c. Re-deploy your app
For these changes to take place, we need to redeploy our lambda app.

`$ serverless deploy -v`

### Step 4. Test your endpoint

In your web browser, hit the given url from the previous step, but replace `{initials}` with your initials.

![Browser screen cap](https://www.kcoleman.me/images/avatar_images/browser.png)

Now you can embed these images in images tags or use them on your native mobile app just like you would with a regularly uploaded image.

_For the [latest source code](https://github.com/kevincolemaninc/letter-avatar-serverless)_
