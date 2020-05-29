
var Twit = require('twit')

var T = new Twit({
  consumer_key:         '53rpHke1CigdaHnFYj6ZO4CTP',
  consumer_secret:      '6Lqww1SQvvw9sV2kSNyn1pAxqbfhCUnvlTvLeGs84tvaxVbhx6',
  access_token:         '2219261902-Uy42q45g29M3R7NMhGQaM0rnGiRHmb8AIMfj08I',
  access_token_secret:  '7dhSQMToVYMTOKd7wHexpb8zYCTDNkfpJPi4SfB0b2EqP',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

var stream = T.stream('statuses/filter', { track: 'platzi' })

stream.on('tweet', function (tweet) {
  console.log("-----");   
  console.log(tweet.text)
  console.log("-----");
})