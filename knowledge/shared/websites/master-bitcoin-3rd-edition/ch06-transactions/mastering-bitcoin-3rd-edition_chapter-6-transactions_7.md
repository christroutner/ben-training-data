## Transaction Outputs

The outputs field begins with a compactSize integer indicating the number of outputs in the transaction. The example transaction has two outputs.

Each output contains:
1. An 8-byte amount field specifying the number of satoshis (smallest unit of bitcoin)
2. A length-prefixed output script specifying the conditions that must be met to spend the bitcoins

### Amount Field

The amount is an 8-byte signed integer indicating the number of satoshis to transfer. A satoshi is the smallest unit of bitcoin that can be represented in an onchain transaction, with 100 million satoshis in one bitcoin. Bitcoin's consensus rules allow outputs with values from zero to 21 million bitcoins.

### Uneconomical Outputs and Dust

Despite having no value, zero-value outputs can still be spent under the same rules as other outputs. However, spending an output increases transaction size and fees. If an output's value is less than the cost to spend it, it's considered an "uneconomical output."

Since uneconomical outputs burden full nodes without incentive to ever be spent, many implementations like Bitcoin Core discourage their creation through "dust policies." These policies prevent the relay and mining of transactions with outputs below certain thresholds (typically 546 satoshis).

One exception exists: data carrier outputs (scripts starting with OP_RETURN) can have zero value since they're unspendable anyway.