
<img src="https://www.kcoleman.me/images/avatar_images/ej.png">
<img src="https://www.kcoleman.me/images/avatar_images/fg.png">
<img src="https://www.kcoleman.me/images/avatar_images/fy.png">
<img src="https://www.kcoleman.me/images/avatar_images/fz.png">
<img src="https://www.kcoleman.me/images/avatar_images/gz.png">
<img src="https://www.kcoleman.me/images/avatar_images/jp.png">
<img src="https://www.kcoleman.me/images/avatar_images/kc.png">
<img src="https://www.kcoleman.me/images/avatar_images/nz.png">
<img src="https://www.kcoleman.me/images/avatar_images/qr.png">
<img src="https://www.kcoleman.me/images/avatar_images/ru.png">
<img src="https://www.kcoleman.me/images/avatar_images/rw.png">
<img src="https://www.kcoleman.me/images/avatar_images/vn.png">
<img src="https://www.kcoleman.me/images/avatar_images/fl.png">

# Letter Avatars with Serverless

The full tutorial on how to create this repository can be found here: 

## Quick Start
### Step 1. Deploy
For first time deployments, this may take a minute, because serverless need to configure your AWS account to add the lambda and api gateway services.

`$ serverless deploy -v`

Successful deploy output

```
  Sucessful deploy output:

      Service Information
      service: modernwaffle
      stage: dev
      region: us-east-1
      api keys:
        None
      endpoints:
        GET - https://{app}.execute-api.us-east-1.amazonaws.com/dev/profilePic/{initials}
      functions:
        profilePic: modernwaffle-dev-profilePic
```

### Step 2. Configure AWS Lambda
Unfortunately, AWS does not support all of the configuration we need to do to get this working via their API yet.  So we will need to manually go into our aws console to continue our configurations.

#### Step 3a. Enable Binary Support for API Gateway
Following this image, we need to add "*/*" to our binary media type.  API Gateway will look at the accept headers of the web request to determine whether or not to use the binary response.  If the accept headers don't exactly match what is listed here, the API will return JSON instead of our lovely png.  I opt for `*/*` because our API should always return a PNG, not matter what the accept headers are.

<img src='https://www.kcoleman.me/images/avatar_images/binary_support.png' />

#### Step 3b. Configure Lambda function permissions
In the API Gateway page click "Resources" -> "GET" -> "Integration request"

<img src='https://www.kcoleman.me/images/avatar_images/aws_resources.png' />

Now click on the "pencil" icon next to the lambda function

<img src='https://www.kcoleman.me/images/avatar_images/aws_edit.png' />

and then click on the check box.  This will trigger an alert saying it needs to add a permission to AWS lambda.  Click ok, and continue.

<img src='https://www.kcoleman.me/images/avatar_images/aws_check.png' />

Woot! That is it for the configuration.

#### Step 3c. Re-deploy your app
For these changes to take place, we need to redeploy our lambda app.

`$ serverless deploy -v`

### Step 4. Test your endpoint

In your web browser, hit the given url from the previous step, but replace `{initials}` with your initials.

<img src='https://www.kcoleman.me/images/avatar_images/browser.png'>

Now you can embed these images in images tags or use them on your native mobile app just like you would with a regularly uploaded image.

_For the [latest source code](https://github.com/kevincolemaninc/letter-avatar-serverless)_
