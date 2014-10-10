# Create your views here.
# coding=utf-8

import json

from django.shortcuts import render
from django.http import HttpResponse

from hashtagbattle.constants import helper
from hashtagbattle.constants import integers
from hashtagbattle.constants import strings

def index(request):
  return render(request, 'index.html')

def get_hashtag_count(request):
  twitter = helper.get_twitter()
  hashtag = request.GET['hashtag']
  api_response = helper.create_response(integers.CODE_ERROR_EXCEPTION_OCCURED,
  strings.MESSAGE_ERROR_EXCEPTION_OCCURED)

  """Converting the datetime info sent by client to UTC."""
  last_updated_at = helper.string_to_date(request.GET['lastUpdatedAt'])
  try:
    twitter_response = twitter.search(q=hashtag,
                              since=last_updated_at.date(),
                              count=50,
                              result_type='recent')

    tweets = twitter_response['statuses']
    new_hashtag_count, new_media_count = 0, 0
    new_favorite_count, new_retweet_count = 0, 0
    last_tweet = 'None'
    for tweet in tweets:
      tweet_date = helper.string_to_date(tweet['created_at'])
      time_difference = (tweet_date - last_updated_at).total_seconds()

      """
      In order for a hashtag to be new it must be more recent
      than the last update date of the model. Media count is
      incremented only if it's in a new hashtag.
      """

      if time_difference > 0:
        new_hashtag_count += 1

        if last_tweet == 'None':
          last_tweet = tweet['text']

        if 'media' in tweet['entities']:
          new_media_count += 1

    data = {'new_hashtag_count': new_hashtag_count,
                'new_media_count': new_media_count,
                'last_tweet': last_tweet}

    api_response = helper.create_response(integers.CODE_SUCCESS,
                                          strings.MESSAGE_SUCCESS,
                                          data)
    last_tweet = 'None'
  except Exception, e:
    print 'An expection occured: ' + str(e)
    return HttpResponse(json.dumps(api_response),
                      content_type= 'application/json')

  return HttpResponse(json.dumps(api_response),
                    content_type= 'application/json')
