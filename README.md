# Chatbot

## Setup Virtual Enviroment

### Install pip first

#### For Linux and Mac:
```bash
sudo apt-get install python3-pip
```

### Install virtualenv
```bash
pip install virtualenv 
```

### Create  a virtual enviroment with the name venv
```bash
virtualenv venv
```

### Activate the virtual enviroment

#### Linux
```bash
. venv/bin/activate
```

#### Microsoft
```bash
venv\Scripts\activate
```

## Get required packages into the virtual enviroment
```bash
pip install -r requirements.txt
```

## [Quickly Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration)
```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: json
```

## Tips
The standard `aws configure` adds a `default` profile instead of `adminuser`, so if you try to run `server.py` immediately after configuring AWS CLI you might get a `botocore.exceptions.ProfileNotFound: The config profile (adminuser) could not be found` error.

To fix this, you have to add an `adminuser` profile to your `config` file. On Linux or macOS, this is usually located at `~/.aws/config`. On Windows, this is `C:\Users\USERNAME \.aws\config`

Simply add the following at the bottom of the file.

```
[profile adminuser]
region = INSERT REGION
output = INSERT JSON
aws_access_key_id = INSERT ACCESS KEY ID
aws_secret_access_key = INSERT SECRET ACCESS KEY
```

You can simply use the same values as those under the `default` user.


## Run The Application

### For Linux and Mac:

```bash
export FLASK_APP=chatbot.py
export FLASK_ENV=development
flask run
```

### For Windows cmd, use set instead of export:

```bash
set FLASK_APP=chatbot.py
set FLASK_ENV=development
flask run
```

###  For Windows PowerShell, use $env: instead of export:

```bash
$env:FLASK_APP = "chatbot"
$env:FLASK_ENV = "development"
flask run
```

You’ll see output similar to this:

```bash
Serving Flask app "chatbot"
Environment: development
Debug mode: on
Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```



[aws-amazon-polly-flask-sample](https://github.com/spaceraccoon/aws-amazon-polly-flask-sample)