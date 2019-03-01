#Rabbit MQ
##Getting started
[Source] {https://www.rabbitmq.com/tutorials}
| Producer | A program that sends a message |
| Consumer | A program that receives a message |
| Queue    | A "large message buffer" that lives inside Rabbit MQ |

##Exchange types
| Fanout | Mindlessly Broadcasts |
| Direct | A message goes to the queues whose binding key matches the routing key of the message |
| Topic  | A message is deliverd to all queues that are bound with a matching binding key. Keys are a list of words |

##Work Queues
```javascript
    var q = 'queue_name';
    ch.assertQueue(q, {durable: true});
```

##Publisher/Subscriber

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

##Message Properties

| Property | Description | Value |
| -------- |:-----------:| -----:|
|persistent| marks the message as transient or persistent | boolean |
|content_type| describes mime-type of encoding ||
|reply_to| names a callback queue | queue |
|correlation_id| correlates RPC responses with requests | unique value |