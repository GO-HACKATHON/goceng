import json

from copy import deepcopy
from datetime import datetime, timedelta

def read_json (path):
  rows = []
  with open(path, 'rb') as filedata:
    rows = json.load(filedata)
  return rows

def print_json (data):
  print json.dumps(data, indent=2)

def write_json (data, filename):
  with open(filename, 'w') as outfile:
    json.dump(data, outfile, indent=2)

def flatten (arr):
  return [e for sl in arr for e in sl]

def uniq (arr):
  return list(set(arr))

def datetime_from_str (string):
  frmt = '%Y-%m-%d %H:%M:%S'
  return datetime.strptime(string, frmt)

def datetime_floor_hour (datetime_obj):
  result = deepcopy(datetime_obj)
  return result.replace(minute=0, second=0, microsecond=0)

def current_date ():
  return datetime.now().replace(minute=0, second=0, microsecond=0)

def get_ranged_timestamps (timestamp, day=23):
  pivot_timestamp = str(datetime_floor_hour(datetime_from_str(timestamp)).replace(day=day))
  current_timestamp = current_date().replace(day=day, hour=0)
  timestamps = [current_timestamp + timedelta(hours=i) for i in range(24)]
  timestamps = [str(e) for e in timestamps]
  index = timestamps.index(pivot_timestamp)
  indexes = [(index+i)%24 for i in range(-2, 3)]
  timestamps = [t for idx, t in enumerate(timestamps) if idx in indexes]
  return timestamps
