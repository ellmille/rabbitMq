#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

/**
 * Connect to server and listen
 * {@link https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html}
 */
amqp.connect('amps://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        var q = 'hello';
        //assert queue
        ch.assertQueue(q, {durable: false});
        
        //get data
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg){
            console.log(" [x] Received %s", msg.content.toString());     
        }, {noAck: true});
    });
});