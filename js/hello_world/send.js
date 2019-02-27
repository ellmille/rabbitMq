#!/usr/bin/env node
var amqp = require('amqplib/callback_api');

/**
 * Connect to server and send
 * {@link https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html}
 */
amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        var q = 'hello';
        //declare a queue
        ch.assertQueue(q, {durable: false});
        //send message
        ch.sendToQueue(q, new Buffer('Hello World!'));
        console.log("[x] Send 'Hello World!'");
    });
    //close connection and exit
    setTimeout(function() { 
        conn.close(); 
        process.exit(0); 
    }, 500);
});