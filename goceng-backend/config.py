import os

class Config(object):
  PORT = os.getenv('PORT', '5001')
  MONGO_HOST = os.getenv('MONGO_HOST', '172.17.0.2')
  MONGO_PORT = int(os.getenv('MONGO_PORT', '27017'))
  MONGO_DB = os.getenv('MONGO_DB', 'gohack')
  TIMEOUT = int(os.getenv('TIMEOUT', '60'))
  GMAPS_API_KEY = os.getenv('GMAPS_API_KEY', 'lalala')