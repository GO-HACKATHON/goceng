import os
import time

from flask import Flask, jsonify, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS

from config import Config
from modules.handlers.hello_handler import HelloHandler
from modules.handlers.event_handler import EventHandler
from modules.handlers.route_handler import RouteHandler

app = Flask(__name__)
CORS(app)
app.config.update(DEBUG=False)

@app.route("/")
def hello():
  return HelloHandler.hello()

@app.route("/v1/event")
def get_events_by_area():
  return EventHandler.get_events_by_area(endpoint='/v1/event')

@app.route("/v1/route")
def get_route():
  return RouteHandler.get_route(endpoint='/v1/route')

@app.route("/v1/multiple_route")
def get_multiple_route():
  return RouteHandler.get_multiple_route(endpoint='/v1/multiple_route')

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=Config.PORT)
