#!/usr/bin/env node
/**
 * Log based on severity of the error
 * {@link https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html}
 */
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'direct_logs';
        var args = process.argv.slice(2); 

        var msg = args.slice(1).join(' ') || 'Hello World!';
        /** take entered severity or use info */
        var severity = (args.length > 0) ? args[0] : 'info';

        ch.assertExchange(ex, 'direct', {durable: false});
        ch.publish(ex, severity, new Buffer(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
    });

    setTimeout(function() { 
        conn.close(); 
        process.exit(0);
    }, 500);
});