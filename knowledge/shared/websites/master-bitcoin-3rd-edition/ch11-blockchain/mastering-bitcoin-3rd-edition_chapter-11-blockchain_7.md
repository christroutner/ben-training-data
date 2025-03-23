## Bitcoin's Test Blockchains: Testnet

Besides the main Bitcoin blockchain (mainnet), several test blockchains exist for development purposes. Testnet is a fully featured live P2P network with wallets, mining, and all mainnet features, but its coins are intentionally worthless. This allows developers to test their software without risking real money or endangering the main network.

The current implementation is testnet3, the third iteration, restarted in February 2011. It's a substantial blockchain (over 30 GB in 2023) that takes time to sync. Testnet addresses are distinguished from mainnet addresses by different prefixes (testnet addresses begin with m, n, or tb1 instead of 1, 3, or bc1) to prevent accidental sending of real bitcoins to test addresses.

To use testnet with Bitcoin Core, start the software with the `-testnet` flag:

```
$ bitcoind -testnet
$ bitcoin-cli -testnet getblockchaininfo
```

Testnet supports all mainnet features, including segregated witness and taproot, making it useful for comprehensive testing. However, testnet has a fundamental problem: since its proof-of-work security depends on economic incentives that don't exist in a valueless test environment, disruptive miners can create blocks without including user transactions, sometimes making testnet temporarily unusable.