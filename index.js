var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var twilio = require('twilio');
var client = require('twilio')('<insert from twilio service (SID)>', '<insert from twilio service(AUTH token)>');
var Twit = require('twit')

//Twitter API stuff

var T = new Twit({
  consumer_key:         '<insert from apps.twitter.com>',
  consumer_secret:      '<insert from apps.twitter.com>',
  access_token:         '<insert from apps.twitter.com>',
  access_token_secret:  '<insert from apps.twitter.com>'
})

//Body Parser for encoding url's to make the {searchitem} work
app.use(bodyParser.urlencoded({extended: false}))
// Some tests...
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
//Make sure your twilio url for messages is set to {url}/sms
app.post('/sms', function (req, res) {

  var resp = new twilio.TwimlResponse();
  var body = req.body.Body
  console.log(body);

  var command = body.split(' ')[0]
  var hash = body.split(' ')[1]


  if (command === 'search') {

    T.get('search/tweets', { q: hash, count: 1 }, function(err, data, response) {
      console.log(data);

   
      resp.message(data.statuses[0].text);
      res.send(resp.toString());

  })

  }

});
