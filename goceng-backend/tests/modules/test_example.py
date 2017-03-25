import os
import unittest

from modules.helper import read_json, print_json
 
class ExampleTests(unittest.TestCase):
 
  def setUp(self):
    pass
 
  def tearDown(self):
    pass
 
  def testBasic(self):
    self.assertTrue(1 == 1)
    
if __name__ == "__main__":
  unittest.main()