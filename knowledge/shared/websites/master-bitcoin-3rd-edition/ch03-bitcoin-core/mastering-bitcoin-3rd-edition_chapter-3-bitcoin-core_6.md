## Bitcoin Core Command-Line Interface

Bitcoin Core implements a JSON-RPC interface that can be accessed using the `bitcoin-cli` command-line helper. This allows for interactive experimentation with the API capabilities. To see available commands:

```
$ bitcoin-cli help
+== Blockchain ==
getbestblockhash
getblock "blockhash" ( verbosity )
getblockchaininfo
...
```

For detailed help on specific commands, include the command name:

```
$ bitcoin-cli help getblockhash
getblockhash height

Returns hash of block in best-block-chain at height provided.
...
```

Key status commands include:
- `getblockchaininfo`: Shows blockchain state including height and verification progress
- `getnetworkinfo`: Displays network node status, connections, and network details
- `getmempoolinfo`: Provides information about the memory pool of unconfirmed transactions
- `getwalletinfo`: Shows wallet status if a wallet is loaded