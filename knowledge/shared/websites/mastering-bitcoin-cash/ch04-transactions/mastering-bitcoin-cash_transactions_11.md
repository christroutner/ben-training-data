# Script Execution in Practice

When validating a transaction, Bitcoin Cash executes the unlocking and locking scripts. First, the unlocking script is executed. If it executes without errors, the main stack is copied and the locking script is executed. If the result is TRUE, the unlocking script has successfully satisfied the conditions, making the input valid.

For example, in a P2PKH transaction, the combined script execution would look like:
```
<Signature> <Public Key> OP_DUP OP_HASH160 <Public Key Hash> OP_EQUAL OP_CHECKSIG
```

The script execution process works as follows:
1. Push the signature onto the stack
2. Push the public key onto the stack
3. Duplicate the public key on the stack
4. Hash the public key
5. Push the public key hash from the locking script onto the stack
6. Compare the two hashes for equality
7. Verify the signature against the public key

The transaction is valid if execution completes with TRUE on top of the stack. This systematic approach ensures that only those who can provide valid signatures matching the conditions in the locking script can spend the bitcoins.