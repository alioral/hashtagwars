import strings
import pytz

from twython import Twython
from dateutil import parser


# Singleton pattern (quick hack)
twitter = None
def get_twitter():
  global twitter
  if not twitter:
    twitter = Twython(strings.APP_KEY,
                      strings.APP_SECRET,
                      strings.OAUTH_TOKEN,
                      strings.OAUTH_TOKEN_SECRET)
  return twitter

def string_to_date(string):
  return parser.parse(string).replace(tzinfo=None)

def create_response(code, message, data=None):
  return {
    'code': code,
    'message': message,
    'data': data
  }
