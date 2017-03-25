import os
import unittest

from modules.helper import read_json, print_json
from modules.objects.route import Route
 
class ExampleTests(unittest.TestCase):
 
  def setUp(self):
    pass
 
  def tearDown(self):
    pass
 
  def testBasic(self):
    raw = read_json('tests/fixtures/itb-bec.route.json')
    route = Route(raw['routes'][0])
    self.assertTrue(route.total_distance == 4568)
    self.assertTrue(route.total_duration == 835)
    
if __name__ == "__main__":
  unittest.main()