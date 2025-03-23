## Bitcoin's Test Blockchains: Regtest

Regtest (Regression Testing) allows developers to create a local blockchain for testing purposes. Unlike the public testnet and signet networks, regtest blockchains are meant to be closed systems for local testing, either with multiple nodes or just a single node.

To start Bitcoin Core in regtest mode:

```
$ bitcoind -regtest
$ bitcoin-cli -regtest getblockchaininfo
```

Regtest starts with zero blocks, allowing you to create a blockchain from scratch. You can create a wallet, generate addresses, and mine blocks instantly:

```
$ bitcoin-cli -regtest createwallet ""
$ bitcoin-cli -regtest getnewaddress
bcrt1qwvfhw8pf79kw6tvpmtxyxwcfnd2t4e8v6qfv4a
$ bitcoin-cli -regtest generatetoaddress 500 bcrt1qwvfhw8pf79kw6tvpmtxyxwcfnd2t4e8v6qfv4a
```

Mining blocks takes only seconds in regtest mode, making development and testing much faster. After mining blocks, you can immediately see your balance (though, as on mainnet, coinbase rewards require 100 blocks of confirmation before spending):

```
$ bitcoin-cli -regtest getbalance
12462.50000000
```