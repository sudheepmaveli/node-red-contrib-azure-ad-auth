# node-red-contrib-socketio-client-with-dynamic-listener-emitter

## Nodes

1. Socket.IO Emitter
2. Socket.IO Listener

## How to use

> Socket.IO Connector -> Socket.IO Listener -> Payload

#Note: Now this lib under development


# 1. Socket.IO Emitter 

  We can create dynamic emittor node. ie the event name and message are created runtime based on the input's message payload.
  From message payload we accept eventName as 'msg.payload.eventName' and emitted message as  'msg.payload.message'.
  
# 2. Socket.IO Listener 

  We can create dynamic listener node. ie the event name is created runtime based on the input's message payload.
  From message payload we accept eventName as 'msg.payload.eventName'.
  
