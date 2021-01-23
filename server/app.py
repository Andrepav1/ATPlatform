import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return 'GET Home'


@app.route('/api/', methods=['GET'])
def api_all():
    return 'GET API Index'


@app.route('/test', methods=['GET'])
def test():
  return 'test'


app.run()
