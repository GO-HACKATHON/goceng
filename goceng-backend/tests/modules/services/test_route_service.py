import os
import unittest

from modules.helper import read_json, print_json
from modules.services.route_service import RouteService
 
class RouteServiceTests(unittest.TestCase):
 
  def setUp(self):
    pass
 
  def tearDown(self):
    pass
 
  def testPreprocess(self):
    raw = read_json('tests/fixtures/itb-bec.route.json')
    res = RouteService.preprocess(raw=raw)
    # ===
    self.assertTrue(type(res) is dict)
    self.assertTrue('routes' in res)
    self.assertTrue('status' in res)
    self.assertTrue('geocoded_waypoints' in res)
    # ===
    self.assertTrue(type(res['routes']) is list)
    self.assertTrue(type(res['routes'][0]) is dict)
    self.assertTrue('bounds' in res['routes'][0])
    self.assertTrue('copyrights' in res['routes'][0])
    self.assertTrue('legs' in res['routes'][0])
    self.assertTrue('overview_polyline' in res['routes'][0])
    self.assertTrue('summary' in res['routes'][0])
    self.assertTrue('warnings' in res['routes'][0])
    self.assertTrue('waypoint_order' in res['routes'][0])
 
  def testGetRoute(self):
    # origin = 'Bandung Institute of Technology, Jl. Ganesha No.10, Lb. Siliwangi, Coblong, Kota Bandung, Jawa Barat 40132'
    # destination = 'Istana Bandung Electronic Center, Jalan Purnawarman No. 13-15, Babakan Ciamis, Sumur Bandung, Babakan Ciamis, Sumur Bandung, Kota Bandung, Jawa Barat 40117'
    # res = RouteService.get_route(origin, destination)
    # print_json(res)
    pass

if __name__ == "__main__":
  unittest.main()