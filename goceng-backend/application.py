import os
import time

from flask import Flask, jsonify, render_template, request, redirect, url_for, jsonify

from config import Config
from modules.handlers.hello_handler import HelloHandler

app = Flask(__name__)
app.config.update(DEBUG=False)

@app.route("/")
def hello():
  return HelloHandler.hello()

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=Config.PORT)
