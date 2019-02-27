#!/usr/bin/env node
/**
 * {@link https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html}
 */
var amqp = require('amqplib/callback_api');
var q = 'task_queue';

amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        ch.assertQueue(q, {durable: true});
        
        ch.consume(q, function(msg){
            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
            }, secs * 1000);
        }, {noAck: true});
    });
});