import os
import unittest

from modules.helper import read_json, print_json
from modules.repositories.event_repo import EventRepo
 
class EventRepoTests(unittest.TestCase):
 
  def setUp(self):
    pass
 
  def tearDown(self):
    pass
 
  def testBasic(self):
    er = EventRepo()
    res = er.find_by_criteria({'area': 'bandung', 'timestamp': '2017-03-23 23:00:00'})
    self.assertTrue(type(res) is list)
    if len(res) > 0:
      item = res[0]
      self.assertTrue(type(item) is dict)
      self.assertTrue('city' in item)
      self.assertTrue('area' in item)
      self.assertTrue('country' in item)
      self.assertTrue('locations' in item)
      self.assertTrue('street' in item)
      self.assertTrue('timestamp' in item)
      self.assertTrue('type' in item)

if __name__ == "__main__":
  unittest.main()