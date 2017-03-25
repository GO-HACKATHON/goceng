import json

from config import Config
from modules.helper import print_json, read_json, datetime_from_str, datetime_floor_hour, current_date

class CacheService(object):

  DICT = {}
  
  @staticmethod
  def get (key):
    return CacheService.DICT[key]
  
  @staticmethod
  def save (key, data):
    CacheService.DICT[key] = data
  
  @staticmethod
  def if_any (key):
    return key in CacheService.DICT