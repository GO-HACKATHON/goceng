import json

from datetime import datetime
from modules.helper import print_json, current_date

class Route (object):

  def __init__ (self, args):
    self.bounds = args['bounds']
    self.legs = [self._process_leg(leg) for leg in args['legs']]
    self.summary = args['summary']
    self.waypoint_order = args['waypoint_order']
    self.total_distance = self._total_distance()
    self.total_duration = self._total_duration()

  def to_dict (self):
    return self.__dict__

  def _total_distance (self):
    distances = [leg['distance']['value'] for leg in self.legs]
    total_distance = reduce(lambda x, y: x + y, distances)
    return total_distance

  def _total_duration (self):
    durations = [leg['duration']['value'] for leg in self.legs]
    total_duration = reduce(lambda x, y: x + y, durations)
    return total_duration

  def _process_leg (self, leg):
    res = leg.copy()
    del res['traffic_speed_entry']
    res['steps'] = [self._process_step(e) for e in res['steps']]
    return res

  def _process_step (self, step):
    res = step.copy()
    del res['polyline']
    return res