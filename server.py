from flask import Flask, render_template, request, url_for, jsonify, send_file, Response
from flask_fontawesome import FontAwesome

from argparse import ArgumentParser
import os
import sys

from boto3 import Session
from botocore.exceptions import BotoCoreError, ClientError


# Init Flask App
app = Flask(__name__)
app.secret_key = os.urandom(12)  # Generic key for dev purposes only
fa = FontAwesome(app)

# ======== AWS Polly Setup =========================================================== #
# Mapping possible user browser suported audio formats to their corresponding
# response code for AWS Polly
AUDIO_FORMATS = {"ogg_vorbis": "audio/ogg",
                 "mp3": "audio/mpeg",
                 "pcm": "audio/wave; codecs=1"}

# Create a client using the credentials and region defined in the adminuser
# section of the AWS credentials and configuration files
# For more information read the READEME.md file
session = Session(profile_name="adminuser")
polly = session.client("polly")


# ======== Simple Exception Handler =========================================================== #
class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

# ======== Routing =========================================================== #
# -------- Home ---------------------------------------------------------- #
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


# -------- ASK ---------------------------------------------------------- #
@app.route('/ask', methods=['POST'])
def ask():
    query = request.json['q']
    # TODO: Analyse the query with infromation extraction, and add a dialog manager to keep track of teh conversation.
    response = query
    return jsonify(
        response=response,
    )

# -------- READ ---------------------------------------------------------- #
@app.route('/read', methods=['GET'])
def read():
    """
    Handles routing for speech synthesis by Amazon Polly
    """
    try:
        outputFormat = request.args.get('outputFormat')
        text = request.args.get('text')
        voiceId = request.args.get('voiceId')
    except TypeError:
        raise InvalidUsage("Wrong parameters", status_code=400)

    # Validate the parameters, set error flag in case of unexpected values
    if len(text) == 0 or len(voiceId) == 0 or \
            outputFormat not in AUDIO_FORMATS:
        raise InvalidUsage("Wrong parameters", status_code=400)
    else:
        try:
            # Request speech synthesis
            response = polly.synthesize_speech(Text=text,
                                               VoiceId=voiceId,
                                               OutputFormat=outputFormat)
        except (BotoCoreError, ClientError) as err:
            # The service returned an error
            raise InvalidUsage(str(err), status_code=500)

        return send_file(response.get("AudioStream"),
                         AUDIO_FORMATS[outputFormat])


# ======== Main ============================================================== #
if __name__ == '__main__':
    parser = ArgumentParser(description='Example Flask Application')
    parser.add_argument("-p", "--port", type=int,
                        metavar="PORT", dest="port", default=5000, help='Port number')
    parser.add_argument("--host", type=str, metavar="HOST",
                        dest="host", default="localhost")
    args = parser.parse_args()

    app.run(host=args.host, port=args.port, debug=True)
