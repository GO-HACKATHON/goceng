import json
import time
import urllib
import numpy as np
import Queue, threading

from config import Config
from modules.helper import print_json, read_json, flatten, uniq, datetime_from_str, datetime_floor_hour, current_date, get_ranged_timestamps
from modules.objects.route import Route
from modules.services.event_service import EventService

class RouteService(object):
  
  URL = 'https://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&key=%s'
  URL_WAYPOINTS = 'https://router.project-osrm.org/route/v1/driving/%s,%s;%s,%s'
  THRESHOLD = 0.001

  @staticmethod
  def url_get (url):
    resp = urllib.urlopen(url)
    result = json.loads(resp.read())
    return result

  @staticmethod
  def url_get_queue (url, queue):
    resp = urllib.urlopen(url)
    data = json.loads(resp.read())
    queue.put((url, data))

  @staticmethod
  def preprocess (raw, events, total_events, intersections=False):
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
        if intersections:
          leg['steps'] = RouteService.waypoints_per_steps(steps)
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
  def get_multiple_route (origin, destination, timestamp, waypoints=None, area='bandung', intersections=False):
    url = RouteService.URL % (origin, destination, Config.GMAPS_API_KEY)
    if waypoints is not None:
      url += ('&waypoints=' + waypoints)
    raw_result = RouteService.url_get(url)
    timestamps = get_ranged_timestamps(timestamp)
    result = []
    for timestamp in timestamps:
      current_events = EventService.get_events_by_area(area=area, timestamp=timestamp)
      total_events = EventService.get_events_by_area(area=area)
      result += [RouteService.preprocess(raw_result, events=current_events, total_events=total_events, intersections=intersections)]
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
    res = (len(total_jps) - len(pos)) / float(len(total_jps))
    return res

  @staticmethod
  def jam_per_leg (leg, events):
    res = [RouteService.jam_per_step(step, events) for step in leg['steps']]
    res = reduce(lambda x, y: x + y, res)
    return res

  @staticmethod
  def waypoints_per_step (step):
    res = step.copy()
    url = RouteService.URL_WAYPOINTS % (step['start_location']['lng'], step['start_location']['lat'], step['end_location']['lng'], step['end_location']['lat'])
    url += '?overview=false&steps=true'
    raw_waypoints = RouteService.url_get(url)
    raw_locs = []
    for route in raw_waypoints['routes']:
      for leg in route['legs']:
        for step in leg['steps']:
          for intersection in step['intersections']:
            raw_locs += [intersection['location']]
    locations = [{'lng':e[0], 'lat':e[1]} for e in raw_locs]
    res['intersections'] = locations
    return res

  @staticmethod
  def waypoints_per_steps (steps):
    urls = []
    for step in steps:
      url = RouteService.URL_WAYPOINTS % (step['start_location']['lng'], step['start_location']['lat'], step['end_location']['lng'], step['end_location']['lat'])
      url += '?overview=false&steps=true'
      urls += [url]

    result = Queue.Queue()
    threads = [threading.Thread(target=RouteService.url_get_queue, args = (url, result)) for url in urls]
    for t in threads:
      t.start()
    for t in threads:
      t.join()

    result = list(result.queue)
    result = [[urls.index(e[0]), e[1]] for e in result]
    result = sorted(result, key=lambda x: x[0])
    result = [e[1] for e in result]

    new_steps = []
    for idx, res in enumerate(steps):
      raw_locs = []
      for route in result[idx]['routes']:
        for leg in route['legs']:
          for step in leg['steps']:
            for intersection in step['intersections']:
              raw_locs += [intersection['location']]
      # for waypoint in result[idx]['waypoints']:
      #   raw_locs += [waypoint['location']]
      locations = [{'lng':e[0], 'lat':e[1]} for e in raw_locs]
      res['intersections'] = locations
      new_steps += [res]
    return new_steps
