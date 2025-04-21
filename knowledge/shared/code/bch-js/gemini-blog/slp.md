**SLP Tokens with bch-js**

`bch-js` has support for the Simple Ledger Protocol (SLP), which allows for the creation and management of tokens on the Bitcoin Cash blockchain.

**What is SLP?**

SLP is a token standard that enables anyone to create their own tokens with customizable properties on the Bitcoin Cash network.

**Sub-Modules**

The `slp` module includes several sub-modules:

* `slp.slp`: Core SLP functionality.
* `slp.utils`: Utility functions for working with SLP.
* `slp.address`: SLP address manipulation.
* `slp.ecpair`: ECPair functions specifically for SLP.
* `slp.tokentype1`: Functions for Token Type 1 (the most common SLP token type).
* `slp.nft1`: Functions for Non-Fungible Tokens (NFTs) on SLP.

**Key Concepts**

* Genesis: The transaction that creates a new SLP token.
* Mint: Increasing the supply of an existing SLP token.
* Send: Transferring SLP tokens between addresses.

`bch-js` makes it possible to build applications that issue, manage, and trade SLP tokens.
