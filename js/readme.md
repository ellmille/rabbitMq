#Rabbit MQ
##Getting started
[Source] {https://www.rabbitmq.com/tutorials}
| Producer | A program that sends a message |
| Consumer | A program that receives a message |
| Queue    | A "large message buffer" that lives inside Rabbit MQ |

##Exchange types
| Fanout | Mindlessly Broadcasts |
| Direct | A message goes to the queues whose binding key matches the routing key of the message |

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