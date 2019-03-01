#!/usr/bin/env node
/**
 * {@link https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html}
 */
var amqp = require('amqplib/callback_api');

/** establish connection */
amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        var exchange = 'logs';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";
        /** declare exchange, (uses a fanout exchange) */
        ch.assertExchange(exchange, 'fanout', {durable: false});
        /** publish to 'logs' exchange
         * messages will be lost if no one is listening  */
        ch.publish(exchange, '', new Buffer(msg));
        console.log("[x] Sent '%s'", msg);
    });
    setTimeout(function() {
        conn.close();
        process.exit(0);
    }, 500);
});