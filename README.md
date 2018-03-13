# Seneca Ingress

Used by a gateway to listen for clients being added to the balance-client with `nodeMetadata`. Sends a message with pattern `role:ingress,cmd:add,ingress:...` for the gateway to listen to dynamically add new endpoints.

Metadata is passed in the message configuration:

```javascript
nodeMetadata: {
  ingress: {
    routes: [
      {
        path: '/test',
        method: 'POST',
        pattern:
          'cmd:test,val1:{query.val1},payload:{payload},param1:{params.param1}'
      }
    ]
  }
}
```

Pattern placeholders can be used for `params`, `query`, and `payload`.

**Include as a plugin only in a gateway.**
