import json
import time
import urllib

from config import Config
from modules.helper import print_json, read_json, datetime_from_str, datetime_floor_hour, current_date
from modules.objects.route import Route

class RouteService(object):
  
  URL = 'https://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&key=%s'

  @staticmethod
  def url_get (url):
    resp = urllib.urlopen(url)
    result = json.loads(resp.read())
    return result

  @staticmethod
  def preprocess (raw):
    result = raw.copy()
    result['routes'] = [Route(route).to_dict() for route in result['routes']]
    return result

  @staticmethod
  def get_route (origin, destination):
    raw_result = RouteService.url_get(RouteService.URL % (origin, destination, Config.GMAPS_API_KEY))
    result = RouteService.preprocess(raw_result)
    return result
