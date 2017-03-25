import json

from flask import Flask, render_template, request, redirect, url_for, jsonify
from modules.handlers.error_handler import handle_error

class HelloHandler (object):

  @staticmethod
  def hello ():
    try:
      message = {'text':'hello'}
      res_json = json.dumps(message)
      return res_json
    except Exception as exception:
      return handle_error(endpoint=endpoint, e=exception)