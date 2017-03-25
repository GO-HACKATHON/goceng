import json

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