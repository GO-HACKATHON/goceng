import json
import time
import urllib

from config import Config
from modules.helper import print_json, read_json, datetime_from_str, datetime_floor_hour, current_date
from modules.objects.event import Event
from modules.repositories.event_repo import EventRepo

class EventService(object):
  
  URL = 'https://www.waze.com/%s/web/TGeoRSS?top=%s&right=%s&bottom=%s&left=%s'
  SERVERS = [
    'rtserver',
    'row-rtserver',
    'il-rtserver',
  ]

  @staticmethod
  def url_get (url):
    resp = urllib.urlopen(url)
    result = json.loads(resp.read())
    return result

  @staticmethod
  def get_raw_events_in_area (location):
    top = location['top']
    right = location['right']
    bottom = location['bottom']
    left = location['left']
    result = []
    for server in EventService.SERVERS:
      url = EventService.URL % (server, top, right, bottom, left)
      result += [EventService.url_get(url)]
    raw_events = {}
    for r in result:
      raw_events.update(r)
    return raw_events

  @staticmethod
  def get_events_from_raws (raw_events, area=None):
    result = raw_events
    jams = result['jams'] if 'jams' in result else []
    alerts = result['alerts'] if 'alerts' in result else []
    events = []
    events += [Event.from_jam(e, area).to_dict() for e in jams]
    events += [Event.from_alert(e, area).to_dict() for e in alerts]
    return events

  @staticmethod
  def insert_events (events, event_repo=EventRepo()):
    statuses = [event_repo.insert(event) for event in events]
    return None not in statuses

  @staticmethod
  def mine_events (location, event_repo=EventRepo(), area=None):
    raw_events = EventService.get_raw_events_in_area(location)
    events = EventService.get_events_from_raws(raw_events, area)
    res = EventService.insert_events(events, event_repo=event_repo)
    return len(events)

  @staticmethod
  def get_events_by_area (area=None, timestamp=None, event_repo=EventRepo()):
    criteria = {'area': area}
    is_now = timestamp == 'now'
    if timestamp is not None:
      if timestamp == 'now':
        timestamp = current_date()
      else:
        timestamp = datetime_from_str(timestamp)
        timestamp = datetime_floor_hour(timestamp)
      criteria['timestamp'] = str(timestamp)
    events = event_repo.find_by_criteria(criteria)
    if len(events) == 0 and is_now:
      print '[event-service] events not found for %s, now mine data from waze' %(str(criteria))
      LOCATIONS = read_json('data/locations.json')
      EventService.mine_events(LOCATIONS[area], area=area)
      events = event_repo.find_by_criteria(criteria)
    return events

if __name__ == '__main__':
  LOCATIONS = read_json('data/locations.json')
  while True:
    print ''
    len_events = EventService.mine_events(LOCATIONS['jakarta2'], area='jakarta2')
    print '%s event(s) added' % (str(len_events))
    time.sleep(Config.TIMEOUT)

