const chalk = require("chalk");
const Twit = require("twit");
const config = require('../../config/twitter');

let open = require("amqplib").connect("amqp://localhost");

let client = new Twit(config.twitter);
let wordTrack = ["Platzi", "Open Source", "Node"];
let stream = client.stream("statuses/filter", { track: wordTrack });

function streamActive() {
  let queue = "tasks";
  stream.on("tweet", function (tweet) {
    console.log(chalk.red(tweet.text));
    // Publisher
    open
      .then(function (conn) {
        return conn.createChannel();
      })
      .then(function (ch) {
        return ch.assertQueue(queue).then(function (ok) {
          return ch.sendToQueue(queue, Buffer.from(tweet.text));
        });
      })
      .catch(console.warn);

    // Consumer
    open
      .then(function (conn) {
        return conn.createChannel();
      })
      .then(function (ch) {
        return ch.assertQueue(queue).then(function (ok) {
          return ch.consume(queue, function (msg) {
            if (msg !== null) {
              console.log(chalk.blue(msg.content.toString()));

              ch.ack(msg);
            }
          });
        });
      })
      .catch(console.warn);
  });
}

module.exports = {
  streamActive
}