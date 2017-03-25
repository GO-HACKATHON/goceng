import json

from flask import Flask, render_template, request, redirect, url_for, jsonify
from modules.handlers.error_handler import handle_error
from modules.services.route_service import RouteService

class RouteHandler (object):

  @staticmethod
  def get_route (endpoint=None):
    try:
      origin = request.args.get('origin')
      destination = request.args.get('destination')
      area = request.args.get('area', 'bandung')
      message = RouteService.get_route(origin=origin, destination=destination, area=area)
      response = jsonify(message)
      response.status_code = 200
      return response
    except Exception as exception:
      return handle_error(endpoint=endpoint, e=exception)