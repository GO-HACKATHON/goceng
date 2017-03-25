import os
import unittest
import json

from application import app
 
class ApplicationTests(unittest.TestCase):
 
  def setUp(self):
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False
    app.config['DEBUG'] = False
    self.app = app.test_client()
 
  def tearDown(self):
    pass
 
  def testBasic(self):
    response = self.app.get('/')
    self.assertEqual(response.status_code, 200)
 
  def testEvent(self):
    response = self.app.get('/v1/event?area=bandung&timestamp=2017-03-23 22:10:00')
    self.assertEqual(response.status_code, 200)
    res = json.loads(response.data)
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