## Exploring Blocks

Blocks can be referenced by either their height or hash. To find a block's hash using its height:

```
$ bitcoin-cli getblockhash 123456
0000000000002917ed80650c6174aac8dfc46f5fe36480aaef682ff6cd83c3ca
```

With the block hash, you can retrieve detailed block information:

```
$ bitcoin-cli getblock 0000000000002917ed80650c6174aac8dfc46f5fe36480aaef682ff6cd83c3ca
```

The output includes:
- Block metadata: hash, height, version, timestamp
- Confirmation count: how many blocks have been built on top of this one
- Size measurements: stripped size, full size, and weight
- Fields for security and proof of work: merkle root, nonce, bits, difficulty, chainwork
- Lists of transactions included in the block
- References to previous and next blocks in the chain

This information allows for detailed analysis of the blockchain structure and its contents.