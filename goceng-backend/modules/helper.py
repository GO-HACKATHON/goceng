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

def get_ranged_timestamps (timestamp, day=23, replace=True):
  pivot_timestamp = datetime_floor_hour(datetime_from_str(timestamp))
  current_timestamp = current_date()
  if replace:
    pivot_timestamp = pivot_timestamp.replace(day=day)
    current_timestamp = current_timestamp.replace(day=day, hour=0)
  timestamps = [pivot_timestamp - timedelta(hours=i) for i in range(11, 0, -1)]
  timestamps += [pivot_timestamp + timedelta(hours=i) for i in range(13)]
  timestamps = [str(e) for e in timestamps]
  # index = timestamps.index(str(pivot_timestamp))
  # indexes = [(index+i)%48 for i in range(-2, 3)]
  # timestamps = [t for idx, t in enumerate(timestamps) if idx in indexes]
  return timestamps
