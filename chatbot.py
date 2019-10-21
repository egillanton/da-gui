from flask import Flask, render_template, request, url_for, jsonify

# Init App
app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/ask', methods=['POST'])
def ask():
    # Retrive incoming data fields
    query = request.json['q']
    print(f'User query: {query}')
    response = "Fyrirspurn þín hefur verið mótekin"
    print(f'Response to User: {response}')
    return jsonify(
        response=response,
    )

