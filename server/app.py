import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return 'GET Home'


# A route to return all of the available entries in our catalog.
@app.route('/api/', methods=['GET'])
def api_all():
    return 'GET API Index'

app.run()
