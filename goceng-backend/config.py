import os

class Config(object):
  PORT = os.getenv('PORT', '5001')