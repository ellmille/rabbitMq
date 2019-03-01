#Rabbit MQ
Uses the AMQP Model or Advanced Message Queuing Protocol

##Getting started
[Source] {https://www.rabbitmq.com/tutorials}
| Producer | A program that sends a message |
| Consumer | A program that receives a message |
| Queue    | A "large message buffer" that lives inside Rabbit MQ |
| Dead Letter Exchange | catches messages sent without a matching queue |

Steps
1. Establish Connection
2. Declare Queue

##Establish Connection
First, establish a connection (after requiring the library of course).

```javascript
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {});
    });
```

```java
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");
    try (Connection connection = factory.newConnection();
        Channel channel = connection.createChannel()) {
    }
```

```c#
    var factory = new ConnectionFactory() { HostName = "localhost" };
    using (var connection = factory.CreateConnection())
        {
            using (var channel = connection.CreateModel())
            {

            }
        }
```

##Declare Queue
Next, Declare a Queue to send to

```javascript
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'queue_name';
            ch.assertQueue(q, {durable: true});
        });
    });
```

```java
    String QUEUE_NAME = "queue_name";

    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");
    Connection connection = factory.newConnection();
    Channel channel = connection.createChannel();

    channel.queueDeclare(QUEUE_NAME, false, false, false, null);
```

```c#
    var factory = new ConnectionFactory() { HostName = "localhost" };
    using (var connection = factory.CreateConnection())
    using (var channel = connection.CreateModel())
    {
        channel.QueueDeclare(queue: "queue_name",
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null);
    } 
```

##Send
Publish a message to a queue

```javascript
amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'queue_name';
            ch.assertQueue(q, {durable: true});
            ch.sendToQueue(q, new Buffer('Message to send'));
        });
    });
```

```java
    String QUEUE_NAME = "queue_name";

    ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            String message = "Hello World!";
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes("UTF-8"));
            System.out.println(" [x] Sent '" + message + "'");
        }
```

Close the connection after sending

##Receive
Consume a message from the queue

```javascript
amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'queue_name';
            ch.assertQueue(q, {durable: true});
            ch.consume(q, function(msg) {
                //do something with received message
            }, {noAck: true});
        });
    });
```

```java
    String QUEUE_NAME = "queue_name";

    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");
    Connection connection = factory.newConnection();
    Channel channel = connection.createChannel();

    channel.queueDeclare(QUEUE_NAME, false, false, false, null);
```

##Routing
**Binding is the relationship between an exchange and a queue.**
```javascript
    channel.bindQueue(q.queue, exchange, '');
```
The queue is interested in receiving messages from this exchange

Bindings can also take a key parameter. The meaning of the binding key depends on the exchange type
```javascript
    channel.bindQueue(q.queue, exchange, 'key');
```
In a direct exchange, a message is delivered to any queue whose binding key matches the routing key

A single queue may have multiple binding keys.

To output messages to a log file
```
node receive_direct > logs_error.log 
```

##Topics
Messages sent to a topic exchange cannot have an arbitrary routing key. It must be a list of words (delimited by dots in js)
The binding key must be in the same form
* ```*``` (star) can substitute **one** word
⋅⋅* Behaves similar to a direct exchange
* ```#``` (hash) can substitue **zero or more** words
⋅⋅* Behaves similar to a fanout exchange

##Remote Procedure Call
**RPC is a form of client-server interaction where a program causes a procedure to execute in a different address space, but it is coded as if it were a local procedure call**

```javascript
    ch.assertQueue('', {exclusive: true});
    ch.sendToQueue('rpc_queue',new Buffer('10'), { replyTo: queue_name });
```
Check out the [Management Plugin](https://www.rabbitmq.com/management.html) if you plan on working with RPC more

##Exchange types
| Fanout  | Mindlessly Broadcasts |
| Direct  | A message goes to the queues whose binding key matches the routing key of the message |
| Topic   | A message is deliverd to all queues that are bound with a matching binding key. Keys are a list of words |
| Headers | Similar to a topic exchange, however it routes based on header values instead of routing keys |
| Default | A nameless exchange that routs messages to the queue with the name specified as the first parameter, if it exists. shown as "" |

##Message Properties
| Property | Description | Value |
| -------- |:-----------:| -----:|
|persistent| marks the message as transient or persistent | boolean |
|content_type| describes mime-type of encoding ||
|reply_to| names a callback queue | queue |
|correlation_id| correlates RPC responses with requests | unique value |