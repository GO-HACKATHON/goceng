import json

from datetime import datetime
from modules.helper import print_json, current_date

class Event (object):

  def __init__ (self, args):
    self.country = args['country']
    self.city = args['city']
    self.street = args['street']
    self.locations = args['locations']
    self.type = args['type']
    self.area = args['area']
    self.timestamp = str(current_date())

  def to_dict (self):
    return self.__dict__

  @staticmethod
  def from_alert (alert, area=None):
    args = {
      'country': alert.get('country', ''),
      'city': alert.get('city', ''),
      'street': alert.get('street', ''),
      'locations': [] if alert.get('location', None) is None else [alert.get('location')],
      'type': alert.get('type', ''),
      'area': area,
    }
    args = {key: args[key].lower() if type(args[key]) in [str, unicode] else args[key] for key in args}
    return Event(args)

  @staticmethod
  def from_jam (jam, area=None):
    args = {
      'country': jam.get('country', ''),
      'city': jam.get('city', ''),
      'street': jam.get('street', ''),
      'locations': jam.get('line', ''),
      'type': 'jam',
      'area': area,
    }
    args = {key: args[key].lower() if type(args[key]) in [str, unicode] else args[key] for key in args}
    return Event(args)