## The Proof-of-Work Algorithm

Bitcoin's mining process uses the SHA256 hash function as part of its proof-of-work algorithm. Mining involves hashing the block header repeatedly while changing parameters until finding a hash that matches a specific target.

A hash algorithm takes arbitrary-length data input and produces a fixed-length deterministic result (digest). For SHA256, the output is always 256 bits long, regardless of input size. A key characteristic is that it's computationally infeasible to find two different inputs producing the same digest or to select an input that produces a desired digest.

In Bitcoin mining, miners must find a block header hash that is numerically less than the target. This target determines the difficulty—a lower target means greater difficulty in finding a valid hash. Finding such a hash constitutes proof that a specific amount of computational work was done, hence "proof of work."

The target is represented in the block header in a notation called "target bits" or just "bits." This notation expresses the target as a coefficient/exponent format. For example, in block 277,316, the value 0x1903a30c represents a target where the exponent is 0x19 and the coefficient is 0x03a30c. This target means a valid block must have a header hash with more than 60 leading bits set to zero—an extremely difficult challenge.