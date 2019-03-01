#!/usr/bin/env node
/**
 * {@link https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html}
 */
var amqp = require('amqplib/callback_api');
var q = 'task_queue';
/** grab string entered through console or use hello world */
var msg = process.argv.slice(2).join(' ') || "Hello World!";

/** connect, assert queue and send message to queue*/
amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        /** if the client queue is durable, the listener queues must be durable*/
        ch.assertQueue(q, {durable: true});
        ch.sendToQueue(q, new Buffer(msg), {persistent: true});
        console.log("[x] Sent '%s'", msg);
    });
    //close connection and exit
    setTimeout(function() { 
        conn.close(); 
        process.exit(0); 
    }, 500);
});