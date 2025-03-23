## Segregated Witness's New Signing Algorithm

Signatures in Bitcoin are applied on a commitment hash calculated from the transaction data. The legacy commitment hash calculation method had a vulnerability: the number of hash operations increased quadratically with the number of inputs, potentially allowing attackers to create transactions requiring excessive hash operations to verify.

Segregated Witness (SegWit) addressed this issue by changing how the commitment hash is calculated. For SegWit version 0 witness programs, signature verification uses the improved algorithm specified in BIP143, which scales linearly (O(n)) with the number of signature operations rather than quadratically. This improvement reduces the potential for denial-of-service attacks using overly complex transactions.

The new algorithm maintains security while significantly improving efficiency, especially for transactions with multiple inputs, making the Bitcoin network more resistant to certain types of attacks.