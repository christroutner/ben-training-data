# Standard Transaction Types

Bitcoin Cash has five standard transaction types that are accepted by the reference client:

1. **Pay-to-Public-Key-Hash (P2PKH)**: The most common transaction type, containing a locking script that encumbers the output with a public key hash (Bitcoin Cash address). These transactions have locking scripts in the form:
   ```
   OP_DUP OP_HASH160 <Public Key Hash> OP_EQUAL OP_CHECKSIG
   ```

2. **Pay-to-Public-Key**: A simpler form where the public key itself (not its hash) is stored in the locking script:
   ```
   <Public Key> OP_CHECKSIG
   ```

3. **Multi-Signature**: Scripts requiring M signatures from N potential signers (M-of-N scheme). Standard multi-signature scripts are limited to 15 listed public keys:
   ```
   M <Public Key 1> <Public Key 2> ... <Public Key N> N OP_CHECKMULTISIG
   ```

4. **Data Output (OP_RETURN)**: Allows storing up to 220 bytes of non-payment data in a transaction:
   ```
   OP_RETURN <data>
   ```
   These outputs are provably unspendable and not stored in the UTXO set.

5. **Pay-to-Script-Hash (P2SH)**: Allows complex scripts to be referenced by a hash, simplifying their use.