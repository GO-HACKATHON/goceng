import json

from datetime import datetime
from modules.helper import print_json, current_date

class Route (object):

  def __init__ (self, args):
    self.bounds = args['bounds']
    self.legs = args['legs']
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