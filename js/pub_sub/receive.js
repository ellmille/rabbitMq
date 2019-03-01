#!/usr/bin/env node
/**
 * {@link https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html}
 * Save logs to a file by using the console command node receive.js > logs.log
 */
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        var exchange = 'logs';
        /** declare exchange, (uses a fanout exchange) */
        ch.assertExchange(exchange, 'fanout', {durable: false});

        ch.assertQueue('', {exclusive: true}, function(err, q){
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, exchange, '');

            ch.consume(q.queue, function(msg){
                if(msg.content){
                    console.log(" [x] %s", msg.content.toString());
                }
            }, {noAck: true});
        });
    });
});