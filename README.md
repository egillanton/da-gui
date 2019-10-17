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
```bash
source venv/bin/activate
```

## Get required packages into the virtual enviroment
```bash
pip install -r requirements.txt
```

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