## Configuring the Bitcoin Core Node

Bitcoin Core looks for a configuration file in its data directory at startup. To locate this directory, run `bitcoind -printtoconsole` and check the output:

```
$ bitcoind -printtoconsole
2023-01-28T03:21:42Z Bitcoin Core version v24.0.1
...
2023-01-28T03:21:42Z Default data directory /home/harding/.bitcoin
2023-01-28T03:21:42Z Config file: /home/harding/.bitcoin/bitcoin.conf
...
```

The configuration file offers over 100 options to modify the node's behavior. Key configuration options include:

- **`alertnotify`**: Executes a command when alerts are raised
- **`conf`**: Specifies an alternative configuration file location
- **`datadir`**: Sets the directory for blockchain data
- **`prune`**: Reduces disk space requirements by deleting old blocks
- **`txindex`**: Maintains a complete index of all transactions
- **`dbcache`**: Sets the size of the UTXO cache
- **`blocksonly`**: Minimizes bandwidth by only relaying confirmed transactions
- **`maxmempool`**: Limits the transaction memory pool size

For a full-index node suitable for API access, you might use:
```
alertnotify=myemailscript.sh "Alert: %s"
datadir=/lotsofspace/bitcoin
txindex=1
```

For a resource-constrained system:
```
alertnotify=myemailscript.sh "Alert: %s"
blocksonly=1
prune=5000
dbcache=150
maxmempool=150
```

After configuration, you can run Bitcoin Core in the background with `bitcoind -daemon` and monitor its progress using `bitcoin-cli getblockchaininfo`.