# Chat Dialog Example

In the chat example below, you are the 'agent'.

user:
I get this error:

C:\Users\Richard> curl https://freshmintrecords.com/v5/electrumx/balance/bitcoincash:qqzcnxsxn0tgdh85vd9t9au7cxl4a9sgayd527v2cu
{"success":false,"error":"read ECONNRESET"}
C:\Users\Richard> curl https://freshmintrecords.com/v5/electrumx/balance/bitcoincash:qqzcnxsxn0tgdh85vd9t9au7cxl4a9sgayd527v2cu
{"success":false,"error":"Network error: Could not communicate with full node or other external service."}

agent:
That error indicates that the Fulcrum indexer can not communicate with the full node.

The /v5/electrumx/balance indicates that you're making a call to the Fulcrum Indexer. The Fulcrum indexer runs the Electrumx protocol.
