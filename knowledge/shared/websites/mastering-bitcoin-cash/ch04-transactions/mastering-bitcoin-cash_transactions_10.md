# Pay-to-Script-Hash (P2SH) in Detail

Pay-to-Script-Hash (P2SH) was introduced in 2012 to simplify using complex scripts. Instead of requiring the sender to include a lengthy script, P2SH uses a hash of the script, shifting complexity from sender to recipient.

With P2SH, a complex script (like a multi-signature requirement) is hashed, and only this hash is included in the locking script:
```
OP_HASH160 <20-byte hash of redeem script> OP_EQUAL
```

When spending, the recipient provides the original script (redeem script) and necessary signatures. The validation happens in two steps:
1. The redeem script is hashed and compared to the hash in the locking script
2. If the hash matches, the unlocking script is executed against the redeem script

P2SH addresses use a Base58Check encoding with prefix "5", resulting in addresses starting with "3". This provides a standard address format for complex scripts, making them as easy to use as regular Bitcoin Cash addresses.

Benefits of P2SH include:
- Shorter transaction outputs
- Script complexity hidden from senders
- Reduced data storage in the UTXO set
- Deferred storage of complex scripts until they're spent
- Shifted transaction fee burden from sender to recipient

Important note: The network accepts P2SH encumbrances even if they hash to invalid redeem scripts, because the script hash gives no indication of the script it represents. This creates a risk of locking Bitcoin Cash in a way that cannot be spent later.