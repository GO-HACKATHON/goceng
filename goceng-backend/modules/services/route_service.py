import json
import time
import urllib
import numpy as np

from config import Config
from modules.helper import print_json, read_json, flatten, uniq, datetime_from_str, datetime_floor_hour, current_date, get_ranged_timestamps
from modules.objects.route import Route
from modules.services.event_service import EventService

class RouteService(object):
  
  URL = 'https://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&key=%s'
  THRESHOLD = 0.001

  @staticmethod
  def url_get (url):
    resp = urllib.urlopen(url)
    result = json.loads(resp.read())
    return result

  @staticmethod
  def preprocess (raw, events, total_events):
    result = raw.copy()
    result['routes'] = [Route(route).to_dict() for route in result['routes']]
    routes = []
    for i_route, route in enumerate(result['routes']):
      legs = []
      for i_leg, leg in enumerate(route['legs']):
        steps = []
        for i_step, step in enumerate(leg['steps']):
          step['jam_meter'] = RouteService.jam_meter_per_step(step, events, total_events)
          steps += [step]
        leg['steps'] = steps
        leg['jam_meter'] = sum([e['jam_meter'] for e in steps]) / float(len(steps))
        legs += [leg]
      route['legs'] = legs
      route['jam_meter'] = sum([e['jam_meter'] for e in legs]) / float(len(legs))
      routes += [route]
    result['routes'] = routes
    del result['geocoded_waypoints']
    del result['status']
    return result

  @staticmethod
  def get_route (origin, destination, waypoints=None, area='bandung'):
    url = RouteService.URL % (origin, destination, Config.GMAPS_API_KEY)
    if waypoints is not None:
      url += ('&waypoints=' + waypoints)
    raw_result = RouteService.url_get(url)
    current_events = EventService.get_events_by_area(area=area, timestamp='now')
    total_events = EventService.get_events_by_area(area=area)
    result = RouteService.preprocess(raw_result, events=current_events, total_events=total_events)
    return result

  @staticmethod
  def get_multiple_route (origin, destination, timestamp, waypoints=None, area='bandung'):
    url = RouteService.URL % (origin, destination, Config.GMAPS_API_KEY)
    if waypoints is not None:
      url += ('&waypoints=' + waypoints)
    raw_result = RouteService.url_get(url)
    timestamps = get_ranged_timestamps(timestamp)
    result = []
    for timestamp in timestamps:
      current_events = EventService.get_events_by_area(area=area, timestamp=timestamp)
      total_events = EventService.get_events_by_area(area=area)
      result += [RouteService.preprocess(raw_result, events=current_events, total_events=total_events)]
    return result

  @staticmethod
  def jam_per_step (step, events):
    points = flatten([e['locations'] for e in events])
    points = [{'lat':e['y'], 'lng':e['x']} for e in points]
    X = [step['start_location']['lng'], step['end_location']['lng']]
    Y = [step['start_location']['lat'], step['end_location']['lat']]
    line_eq = np.poly1d(np.polyfit(X, Y, 1))
    filtered_points = [e for e in points if abs(line_eq(e['lng']) - e['lat']) < RouteService.THRESHOLD]
    return len(filtered_points)

  @staticmethod
  def total_jam_per_step (step, total_events):
    timestamps = [event['timestamp'] for event in total_events]
    timestamps = sorted(uniq(timestamps))
    jpss = []
    for timestamp in timestamps:
      events = [event for event in total_events if event['timestamp'] == timestamp]
      jpss += [RouteService.jam_per_step(step, events)]
    return jpss

  @staticmethod
  def jam_meter_per_step (step, events, total_events):
    jps = RouteService.jam_per_step(step, events)
    total_jps = RouteService.total_jam_per_step(step, total_events)
    pos = [e for e in total_jps if e>= jps]
    res = len(pos) / float(len(total_jps))
    return res

  @staticmethod
  def jam_per_leg (leg, events):
    res = [RouteService.jam_per_step(step, events) for step in leg['steps']]
    res = reduce(lambda x, y: x + y, res)
    return res
