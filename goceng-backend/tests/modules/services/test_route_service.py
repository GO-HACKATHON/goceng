import os
import unittest
import json

from modules.helper import read_json, print_json
from modules.services.route_service import RouteService
from modules.services.event_service import EventService
 
class RouteServiceTests(unittest.TestCase):
 
  def setUp(self):
    pass
 
  def tearDown(self):
    pass
 
  def testPreprocess(self):
    # raw = read_json('tests/fixtures/ss-rsmelinda.route.json')
    # events = read_json('tests/fixtures/bandung-2200.event.json')
    # total_events = EventService.get_events_by_area(area='bandung')
    # res = RouteService.preprocess(raw=raw, events=events, total_events=total_events)
    # print_json(res)
    # # ===
    # self.assertTrue(type(res) is dict)
    # self.assertTrue('routes' in res)
    # # ===
    # self.assertTrue(type(res['routes']) is list)
    # self.assertTrue(type(res['routes'][0]) is dict)
    # self.assertTrue('bounds' in res['routes'][0])
    # self.assertTrue('legs' in res['routes'][0])
    # self.assertTrue('summary' in res['routes'][0])
    # self.assertTrue('waypoint_order' in res['routes'][0])
    pass
 
  def testGetRoute(self):
    # origin = 'Universitas Kristen Maranatha, Sukawarna, Jawa Barat, West Java'
    # destination = 'Rumah Sakit Melinda 2, Pasirkaliki, Bandung City, West Java'
    # res = RouteService.get_route(origin, destination)
    # print_json(res)
    pass
 
  def testGetMultipleRoute(self):
    # origin = 'Universitas Kristen Maranatha, Sukawarna, Jawa Barat, West Java'
    # destination = 'Rumah Sakit Melinda 2, Pasirkaliki, Bandung City, West Java'
    # timestamp = '2017-03-25 22:10:00'
    # res = RouteService.get_multiple_route(origin, destination, timestamp)
    pass
 
  def testJamPerStep(self):
    route = read_json('tests/fixtures/ss-rsmelinda.route.json')
    events = read_json('tests/fixtures/bandung-2200.event.json')
    step = route['routes'][0]['legs'][0]['steps'][1]
    res = RouteService.jam_per_step(step, events)
    self.assertEqual(res, 5)
 
  def testAverageJamPerStep(self):
    # route = read_json('tests/fixtures/ss-rsmelinda.route.json')
    # step = route['routes'][0]['legs'][0]['steps'][1]
    # events = read_json('tests/fixtures/bandung-2200.event.json')
    # total_events = EventService.get_events_by_area(area='bandung')
    # total_jps = RouteService.total_jam_per_step(step, total_events)
    # self.assertEqual(total_jps, [0, 0, 0, 0, 0, 0, 69, 39, 73, 47, 69, 87, 83, 94, 93, 103, 97, 69, 97, 55, 34, 41, 5, 0, 44, 108, 101, 80])
    # jmps = RouteService.jam_meter_per_step(step, events, total_events)
    # self.assertEqual(jmps, 0.75)
    pass
 
  def testJamPerLeg(self):
    route = read_json('tests/fixtures/ss-rsmelinda.route.json')
    events = read_json('tests/fixtures/bandung-2200.event.json')
    leg = route['routes'][0]['legs'][0]
    res = RouteService.jam_per_leg(leg, events)
    self.assertEqual(res, 14)
 
  def testWaypointsPerStep(self):
    # route = read_json('tests/fixtures/ss-rsmelinda.route.json')
    # steps = route['routes'][0]['legs'][0]['steps']
    # res = RouteService.waypoints_per_steps(steps)
    # print_json(res)
    # print res
    pass

if __name__ == "__main__":
  unittest.main()