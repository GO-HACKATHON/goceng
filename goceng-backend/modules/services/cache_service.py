import json
import os
import pickle

from config import Config
from modules.helper import print_json, read_json, datetime_from_str, datetime_floor_hour, current_date

class CacheService(object):

  SAVE_DIR = '/tmp/'
  DICT = {}
  
  @staticmethod
  def get (key):
    return CacheService.DICT[key]
  
  @staticmethod
  def save (key, data):
    CacheService.DICT[key] = data
    CacheService.save_to_disk()
  
  @staticmethod
  def if_any (key):
    CacheService.load_from_disk()
    return key in CacheService.DICT

  @staticmethod
  def save_to_disk ():
    filename = CacheService.SAVE_DIR + 'cache.pickle'
    with open(filename, 'wb') as handle:
      pickle.dump(CacheService.DICT, handle, protocol=pickle.HIGHEST_PROTOCOL)

  @staticmethod
  def load_from_disk ():
    filename = CacheService.SAVE_DIR + 'cache.pickle'
    if os.path.exists(filename):
      with open(filename, 'rb') as handle:
        CacheService.DICT = pickle.load(handle)