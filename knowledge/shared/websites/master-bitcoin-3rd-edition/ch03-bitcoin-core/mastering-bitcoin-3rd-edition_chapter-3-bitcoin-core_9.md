## Using Bitcoin Core's Programmatic Interface

While `bitcoin-cli` is useful for exploration, Bitcoin Core's JSON-RPC API is designed for programmatic access. The API uses HTTP as the transport protocol, and requests are formatted as JSON.

Authentication to the API uses credentials stored in the `.cookie` file created by Bitcoin Core on startup:

```
$ cat .bitcoin/.cookie
__cookie__:17c9b71cef21b893e1a019f4bc071950c7942f49796ed061b274031b17b19cd0
```

You can make direct API calls using tools like `curl`, or use wrapper libraries in various programming languages. For example, using Python with the `python-bitcoinlib` library:

```python
from bitcoin.rpc import RawProxy

# Create a connection to local Bitcoin Core node
p = RawProxy()

# Run getblockchaininfo command, get block count
info = p.getblockchaininfo()
print(info['blocks'])
```

More complex tasks, such as retrieving transaction details or calculating the total value in a block, can be accomplished by chaining API calls:

```python
from bitcoin.rpc import RawProxy

p = RawProxy()

# Get a specific block
blockHash = p.getblockhash(123456)
block = p.getblock(blockHash)

# Calculate total value in the block
total_value = 0
for txid in block['tx']:
    tx = p.getrawtransaction(txid, True)
    for vout in tx['vout']:
        total_value += vout['value']

print("Total value in block: ", total_value)
```

This programmatic access enables automation and integration of Bitcoin Core functionality into applications and services.