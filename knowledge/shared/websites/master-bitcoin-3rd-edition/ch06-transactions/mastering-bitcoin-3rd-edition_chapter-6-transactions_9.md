## Witness Structure

In Bitcoin, a witness is data that solves the mathematical problem posed by an output script. The most common form of witness is a digital signature that proves the spender controls the private key corresponding to a public key specified in the output.

The legacy transaction format placed witnesses in the input script field, but this created several problems for contract protocols:

1. **Circular Dependencies**: Many Bitcoin contract protocols require signing transactions out of order, but when signatures are included in the input script, they affect the transaction's identifier (txid). This creates circular dependencies in transaction chains.

2. **Third-Party Transaction Malleability**: It's often possible to solve the same script in different ways. Anyone could modify Alice's transaction by changing the encoding of values in the input script, creating a conflict with her original transaction and potentially invalidating dependent transactions.

3. **Second-Party Transaction Malleability**: Even if third-party malleability were eliminated, signers could generate alternative signatures and change transaction IDs, breaking transaction chains in contract protocols.

The segregated witness (segwit) soft fork solved these problems by removing witnesses from the txid calculation. This was implemented through a backward-compatible change that defined special output script templates as segwit programs. When spent, these require an empty input script but include data in a new witness structure field.