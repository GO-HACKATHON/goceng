import re
import traceback

from flask import Flask, render_template, request, redirect, url_for, jsonify

def handle_error (endpoint, e, status_code=500, tb=traceback):
  err_msg = {
    'message': str(e),
    'trace': re.sub('\s+', ' ', tb.format_exc()) if tb is not None else None
  }
  response = jsonify(err_msg)
  response.status_code = status_code
  return response