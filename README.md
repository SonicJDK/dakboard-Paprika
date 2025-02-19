This is how I created an AWS lambda function to get meal information from the Praprika app service to display on Dakboard

## Create a Free AWS Account
https://aws.amazon.com/free

## Get an authentication token from Paprika
* In a command prompt
* curl -X POST https://paprikaapp.com/api/v1/account/login --data-urlencode ‘email=MY_EMAIL’ --data-urlencode ‘password=MY_PAPRIKA_PASSWORD’

You should get a response like this:
{"result":{"token":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx”}}%   

Save this value for later

## Create a Lambda function in AWS**
1. Sign in to the Lambda console at https://console.aws.amazon.com/lambda.
2. On the AWS navigation bar, choose an AWS Region
3. Choose Functions in the navigation pane.
4. Choose Create function.
5. Choose Author from scratch.
6. Under Basic information, do the following:
    * In Function name, enter getTodaysMeal
    * For Runtime, choose the latest supported Node.js runtime.
    * For Architecture, keep the default setting.
7. Additional Configurations
    * Select: Enable function URL
    * Select Auth Type: NONE
8. Choose Create function.
9. Create a file under GETTODAYSMEAL:  index.js
10. Delete the file index.mjs
11. In the index.js copy the following code.
12. Replace the XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX after Authorization': 'Bearer with you token from above
13. Click Deploy
14. Click on the Function URL
    1. A new tab should open
    2. You should see the response: {"today":"Nothing is planned","tomorrow":"Nothing is planned"}
15. If you get the correct response: Copy the Functional URL

## Add a block to your Dakboard
1. Log in to your Dakboard account
2. Go to the Screen you want to use
3. Click Add A Block
   * Select: Graphs & External Data
   * Select: External Data/JSON
   * Authentication Type: None
   * URL:  Paste the URL from the Functional URL in AWS
   * Check the box TODAY
        1. Enter title: Today
        2. Select an Icon if you like.  I use Alternate Utensils
   * Click the box Tomorrow
        1. Enter title: Tomorrow
        2. Select an Icon if you like.  I use Alternate Utensils
   * Select the Formatting Tab
        1. Enter Block Title: What’s for dinner?
        2. Select show for the Block Title
   * Click Save
