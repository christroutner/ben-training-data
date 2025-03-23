## Bitcoin's Test Blockchains: Signet

Signet addresses testnet's usability problems by using a "proof of authority" model where each block must contain proof (like a signature) that its creation was authorized by a trusted party. Unlike Bitcoin's permissionless mining, signet mining is fully permissioned - only those with permission can create blocks.

This design choice would be unacceptable for Bitcoin's mainnet but is reasonable for testing where coins have no value. Signet is designed to make creating custom test networks easy - if you disagree with how someone is running their signet, you can create your own.

Bitcoin Core supports a default signet (approximately 1 GB in size as of writing) that implements all mainnet features and is used for testing proposed upgrades through the Bitcoin Inquisition project. Custom signets require knowing the "challenge script" that determines block authorization and possibly connecting to a seed node:

```
bitcoind -signet -signetchallenge=0123...cdef -signetseednode=example.com:1234
```

The Bitcoin development community generally recommends public testing of mining software on testnet3 and all other public Bitcoin software testing on the default signet.