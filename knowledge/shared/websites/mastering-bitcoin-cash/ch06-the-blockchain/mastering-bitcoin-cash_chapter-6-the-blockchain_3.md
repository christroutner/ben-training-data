# The Genesis Block and Block Linking

The genesis block, created in 2009, is the first block in the blockchain and serves as the common ancestor of all blocks. Every Bitcoin Cash node includes this block statically encoded in its software, establishing a secure foundation for the entire blockchain. The genesis block's hash is:

```
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

The genesis block contains a hidden message in its coinbase transaction input: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks." This message serves both as proof of the block's creation date and as a commentary on the financial crisis occurring at Bitcoin's launch.

Bitcoin Cash nodes maintain their local copy of the blockchain by validating and linking incoming blocks. When a node receives a new block, it examines the "previous block hash" field in the header to link it to the existing chain. For example, if a node's local chain ends with block 277,314 (hash: 00000000000000027e7ba6fe7bad39faf3b5a83daed765f05f7d1b71a1632249), and it receives a new block containing this hash in its "previousblockhash" field, the node recognizes this as a valid extension of the chain and adds it at height 277,315.

This linking process creates the continuous chain of blocks that forms the authoritative transaction history in Bitcoin Cash.