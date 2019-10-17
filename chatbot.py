from flask import Flask, render_template, request, url_for, jsonify

# Init App
app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


