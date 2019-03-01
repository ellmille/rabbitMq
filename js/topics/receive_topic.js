#!/usr/bin/env node
/**
 * {@link https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html}
 */
var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);
if (args.length == 0) {
  console.log("Usage: receive_direct.js <location>.<severity>");
  process.exit(1);
}

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'topic_logs';

        ch.assertExchange(ex, 'topic', {durable: false});

        ch.assertQueue('', {exclusive: true}, function(err, q) {
        console.log(' [*] Waiting for logs. To exit press CTRL+C');

        args.forEach(function(severity) {
            ch.bindQueue(q.queue, ex, severity);
        });

        ch.consume(q.queue, function(msg) {
            console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
        }, {noAck: true});
        });
    });
});