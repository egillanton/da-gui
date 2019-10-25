<h1 align="center">
DA-GUI - Dialog Agent Graphical User Interface
</h1>

<img src="img/screenshot.png" alt="Screenshot" align="center"/>


## Table of Contents
<!-- ⛔️ MD-MAGIC-EXAMPLE:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Click to expand</summary>

1. [Introduction](#1-introduction)
2. [Setup](#3-setup)
3. [Authors](#4-authors)
4. [License](#5-license)
5. [References](#6-references)

</details>
<!-- ⛔️ MD-MAGIC-EXAMPLE:END -->


## 1 Introduction

DA-GUI is a Web GUI that runs on top of a Flask Web Server. 

For user interaction, it uses Amazon Polly for speech synthesis and Google Web API for speech recognition. 

This implementation is in Icelandic. The code and comments are in English.

Acts like an echo bot, the server responses with the user's query.

## 2 Setup

Make sure to have Python 3.6 or newer installed.

### 2.1 Get virtualenv

```bash
$ pip3 install virtualenv
```

### 2.2 Create a virtual enviroment

Make sure to create a Python3 instead of Python2 enviroment by refrencing its binaries.
```bash
$ which python3
/usr/bin/python3
```

You can use any name you want, we will use "venv".
```bash
$ virtualenv -p /usr/bin/python3  venv
```

### 2.3 Activate enviroment

```bash
$ . venv/bin/activate
```

Now you have activated your virual enviroment and your teminal should display its name as so:
```bash
$(venv)
```

### 2.4 Install requried packages
```bash
$(venv) pip3 install -r requirements.txt  
```


### 2.5 Configuring the AWS CLI
Guide: [Quickly Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration)

```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: json
```

#### Tips
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


### 2.6 Run The Application

```bash
$(venv) python3 server.py
```

You’ll see output similar to this:

```bash
Serving Flask app "server"
Environment: development
Debug mode: on
Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Open the link in your Chrome browser.

## 4 Authors
* [Egill Anton Hlöðversson](https://github.com/egillanton) - MSc. Language Technology Student

## 5 License
This project is licensed under the Apache License, Version 2.0 - see the [LICENSE](LICENSE) file for details.

## 6 References
* [aws-amazon-polly-flask-sample](https://github.com/spaceraccoon/aws-amazon-polly-flask-sample)
* [Web Speech API Demonstration](https://www.google.com/intl/en/chrome/demos/speech.html)

<p align="center">
🌟 PLEASE STAR THIS REPO IF YOU FOUND SOMETHING INTERESTING 🌟
</p>