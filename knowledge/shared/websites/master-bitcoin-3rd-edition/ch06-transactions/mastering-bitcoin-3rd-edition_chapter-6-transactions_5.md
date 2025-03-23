## Transaction Inputs

The inputs field contains several subfields, starting with a compactSize unsigned integer indicating the number of inputs in the transaction. The minimum value is one, and while there's no explicit maximum, the block size limit effectively constrains transactions to a few thousand inputs at most.

Each input must contain three fields:
1. An outpoint field (identifying the previous output being spent)
2. A length-prefixed input script field
3. A sequence field (indicating conditions on when the transaction can be mined)

### Outpoint

For Alice to transfer her bitcoins to Bob, she needs to reference the previous transaction where she received those bitcoins. The outpoint contains a 32-byte transaction ID (txid) for the previous transaction and a 4-byte output index identifying which specific output from that transaction Alice wants to spend.

When a full node encounters an outpoint, it looks for the referenced output in the blockchain. This provides critical information including:
- The amount of bitcoins assigned to the previous output
- The authorization conditions that must be fulfilled to spend those bitcoins
- The block confirmation data (for relative timelocks)
- Proof that the output exists and hasn't been spent already (preventing double-spending)

Currently, Bitcoin Core maintains a database of unspent transaction outputs (UTXOs) to efficiently track this information.