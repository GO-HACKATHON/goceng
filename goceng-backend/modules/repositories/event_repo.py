from pymongo import MongoClient
from config import Config
from modules.helper import current_date, print_json


class EventRepo (object):

  def __init__(self):
    self.client = MongoClient('%s:%s' % (Config.MONGO_HOST, Config.MONGO_PORT))
    self.db = getattr(self.client, Config.MONGO_DB)

  def insert (self, obj):
    obj_ins = obj.copy()
    try:
      self.db.events.insert_one(obj_ins)
      print '[event-repo] [%s] %s' % (current_date(), str(obj_ins['street']))
      return True
    except Exception as e:
      print str(e)
      return None

  def find_by_criteria (self, criteria):
    try:
      result = [] 
      for event in self.db.events.find(criteria):
        del event['_id']
        event['timestamp'] = str(event['timestamp'])
        result += [event]
      return result
    except Exception as e:
      print str(e)
      return None
    