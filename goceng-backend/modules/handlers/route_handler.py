import json

from flask import Flask, render_template, request, redirect, url_for, jsonify
from modules.handlers.error_handler import handle_error
from modules.services.route_service import RouteService
from modules.services.cache_service import CacheService

class RouteHandler (object):

  @staticmethod
  def get_route (endpoint=None):
    try:
      key = request.url
      if CacheService.if_any(key):
        message = CacheService.get(key)
      else:
        origin = request.args.get('origin')
        destination = request.args.get('destination')
        waypoints = request.args.get('waypoints', None)
        area = request.args.get('area', 'bandung')
        message = RouteService.get_route(origin=origin, destination=destination, waypoints=waypoints, area=area)
        CacheService.save(key, message)
      response = jsonify(message)
      response.status_code = 200
      return response
    except Exception as exception:
      return handle_error(endpoint=endpoint, e=exception)

  @staticmethod
  def get_multiple_route (endpoint=None):
    try:
      origin = request.args.get('origin')
      destination = request.args.get('destination')
      timestamp = request.args.get('timestamp')
      waypoints = request.args.get('waypoints', None)
      intersections = request.args.get('intersections', False)
      intersections = intersections != False
      area = request.args.get('area', 'bandung')
      message = RouteService.get_multiple_route(origin=origin, destination=destination, timestamp=timestamp, waypoints=waypoints, area=area, intersections=intersections)
      response = jsonify(message)
      response.status_code = 200
      return response
    except Exception as exception:
      return handle_error(endpoint=endpoint, e=exception)