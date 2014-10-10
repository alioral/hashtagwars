var HashtagModel = Backbone.Model.extend({
  defaults: {
    hashtag: '',
    count: 0,
    tweetsPerSec: 0,
    mediaCount: 0,
    countInterval: 5000,
    lastTweet: 'None'
  },
  currentDate: function() {
    var now = new Date();
    var nowUTC = new Date(now.getUTCFullYear(),
                           now.getUTCMonth(),
                           now.getUTCDate(),
                           now.getUTCHours(),
                           now.getUTCMinutes(),
                           now.getUTCSeconds());
    return nowUTC
  },
  initialize: function() {
    this.startCounter();

    // createdAt is used to calculate the tweets per sec
    // It is stored as epoch and after each getCount call
    // we calculate tweets per sec as Tweet Count / Elapsed Seconds
    this.set('createdAt', (new Date).getTime());
    this.set('lastUpdatedAt', this.currentDate());
  },
  startCounter: function() {
    var self = this;
    setInterval(function() {
      self.getCount(self);
    }, this.get('countInterval'));
  },
  getCount: function(self) {
    // var currentCount = this.get('count');
    // this.set({'count': currentCount + 1});
    console.log('I am counting for hashtag: ' + self.get('hashtag'));
    console.log('Last updated: ' + self.get('lastUpdatedAt'));
    //console.log('Hashtag count: ' + this.get('count'));

    $.ajax({
      url: 'get_hashtag_count',
      timeout: 4000,
      data: {
        hashtag: self.get('hashtag'),
        lastUpdatedAt: self.get('lastUpdatedAt')
      },
      dataType: 'json',
      error: function(e) {
        console.log('Error!');
        console.log(e);

        $('#error_area').show();
        // Check For Twitter's API Limit
      },
      success: function(response) {
        console.log('Success!');

        // if the response is not successful

        if(response['code'] != 0) {
          $('#error_area').show();
          return;
        }

        $('#error_area').hide();
        var data = response['data'];
        var hashtagCount = self.get('count');
        var mediaCount = self.get('mediaCount');
        var newHashtagCount = data['new_hashtag_count'];
        var newMediaCount = data['new_media_count'];
        var lastTweet = data['last_tweet'];

        console.log(self.get('hashtag') + ' New Hashtags: ' + newHashtagCount);
        console.log(self.get('hashtag') + ' New Medias: ' + newMediaCount);

        if(newHashtagCount > 0) {
          self.set({'count': (hashtagCount + newHashtagCount)});
          self.set({'mediaCount': (mediaCount + newMediaCount)});
          self.set({'lastUpdatedAt':self.currentDate()});
          self.set({'lastTweet': lastTweet});
        }

        var currentEpoch = (new Date).getTime();
        var createdAtEpoch = self.get('createdAt');
        var elapsedSeconds = (currentEpoch - createdAtEpoch) / 1000;
        var tweetCount = self.get('count');
        var tweetsPerSec = (tweetCount / elapsedSeconds).toFixed(2);
        if(tweetsPerSec == 0)
          tweetsPerSec = 0;
        self.set('tweetsPerSec', tweetsPerSec);
      }
    });
  }
});

var HashtagCollection = Backbone.Collection.extend({
  model: HashtagModel
});

var HashtagListView = Backbone.View.extend({
  initialize:function() {
    this.model.on('change', this.render, this);
  },
  render: function() {
    var html = "<li><div id='inner_list'>" +
      "<h1>" + this.model.get('hashtag')+ "</h1>" +
      "<table width='100%'>" +
        "<tr>" +
          "<td width='14%'>" +
            "<table>" +
              "<tr>" +
                "<td><span id='count'>" + this.model.get('count') +
                "</span></td>" +
              "</tr>" +
              "<tr>" +
                "<td><b>TIMES</b></td>" +
              "</tr>" +
            "</table>" +
          "</td>" +
          "<td width='20%'>" +
            "<table>" +
              "<tr>" +
                "<td><span id='count'>" + this.model.get('tweetsPerSec') +
                "</span></td>" +
              "</tr>" +
              "<tr>" +
                "<td>" +
                  "<b>TWEETS/SEC</b>" +
                "</td>" +
              "</tr>" +
            "</table>" +
          "</td>" +
          "<td width='20%'>" +
            "<table>" +
              "<tr>" +
                "<td><span id='count'>" + this.model.get('mediaCount') +
                "</span></td>" +
              "</tr>" +
              "<tr>" +
                "<td><b>MEDIA</b></td>" +
              "</tr>" +
            "</table>" +
          "</td>" +
          "<td>" +
            "<table>" +
              "<tr>" +
                "<td><p>" + this.model.get('lastTweet') +
                "</p></td>" +
              "</tr>" +
              "<tr>" +
                "<td><b>LAST TWEET</b></td>" +
              "</tr>" +
            "</table>" +
          "</td>" +
        "</tr>" +
      "</table>" +
    "</div></li>";

    this.$el.html(html);
    return this;
  }
});

var HashtagView = Backbone.View.extend({
  initialize: function() {
    console.log('Hashtag View initialized');
    _.bindAll(this, 'render', 'addHashtag');
    this.collection = new HashtagCollection();
    this.render();

  },
  addHashtag: function(model) {
    var newHashtag = new HashtagListView({
      model: model
    });

    this.collection.push(model);
    this.$el.prepend(newHashtag.render().$el);
    return this;
  },
  render: function() {
    this.collection.each(this.addHashtag);
    return this;
  },
});
