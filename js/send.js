#!/usr/bin/env node
var amqp = require('amqplib/callback_api');

/**
 * Connect to server
 */
amqp.connect('amps://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        //declare a queue

        //send message
    });
    //timeout
    setTimeout(function() { 
        conn.close(); 
        process.exit(0); 
    }, 500);
});