## Lock Time and Special Transactions

### Lock Time

The final field in a serialized transaction is its lock time. This field restricts when a transaction can be included in the blockchain:

- A lock time of 0 means the transaction is eligible for inclusion in any block.
- A lock time between 1 and 499,999,999 is interpreted as a block height, meaning the transaction can only be included in that block or later.
- A lock time of 500,000,000 or higher is interpreted as epoch time, meaning the transaction can only be included when the block's median time past (MTP) is greater than this value.

### Coinbase Transactions

The first transaction in each block is a special "coinbase transaction" that:
- Has only one input with a null txid and maximal output index
- Contains a "coinbase" field instead of an input script (2-100 bytes)
- Must not exceed the sum of transaction fees plus the block subsidy in its outputs
- May include a commitment to all transactions in the block (since the segwit soft fork)

Outputs from coinbase transactions can't be spent until they've received 100 confirmations (the "maturity rule").