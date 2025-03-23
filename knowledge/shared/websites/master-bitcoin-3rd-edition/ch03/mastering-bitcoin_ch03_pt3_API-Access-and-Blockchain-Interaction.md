## API Access and Blockchain Interaction

Bitcoin Core provides a powerful JSON-RPC API that allows developers to programmatically interact with the blockchain. This API enables you to perform various operations, such as querying balances, sending transactions, and retrieving block information.

The JSON-RPC API is exposed through a built-in HTTP server that runs on port 8332 (for mainnet) by default. To use this API, you can send requests to the server using tools like `curl` or integrate it directly into your application using a library or language-specific client.

For example, you can retrieve the balance of an address using the following command:
```bash
curl -X POST http://localhost:8332 \
     -H "Content-Type: application/json" \
     -d '{"jsonrpc":"1.0","method":"getbalance", "params":[]}'
```
This chapter introduces the basics of using the Bitcoin Core API to interact with the blockchain, enabling developers to build custom solutions on top of the Bitcoin network.
