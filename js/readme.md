#Rabbit MQ
##Exchange types
| Fanout | Mindlessly Broadcasts |
| Direct | A message goes to the queues whose binding key matches the routing key of the message |

##Routing
###Bindings
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

[Source] {https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html}

