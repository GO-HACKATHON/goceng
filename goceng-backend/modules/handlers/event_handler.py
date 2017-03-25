import json

from flask import Flask, render_template, request, redirect, url_for, jsonify
from modules.handlers.error_handler import handle_error
from modules.services.event_service import EventService

class EventHandler (object):

  @staticmethod
  def get_events_by_area (endpoint=None):
    try:
      area = request.args.get('area')
      timestamp = request.args.get('timestamp')
      message = EventService.get_events_by_area(area=area, timestamp=timestamp)
      res_json = json.dumps(message)
      return res_json
    except Exception as exception:
      return handle_error(endpoint=endpoint, e=exception)