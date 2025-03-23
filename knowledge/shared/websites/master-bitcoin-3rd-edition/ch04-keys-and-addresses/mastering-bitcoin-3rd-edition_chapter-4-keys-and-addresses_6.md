## Pay-to-Script-Hash (P2SH) Addresses

Pay-to-Script-Hash (P2SH) was introduced in 2012 via BIP16 to solve a key problem: how to enable complex spending conditions without requiring senders to understand them. Rather than putting complex conditions in the output script, P2SH places a commitment (hash) to a redemption script.

The process works as follows:

1. The receiver creates a redemption script with desired spending conditions (e.g., requiring multiple signatures)
2. This script is hashed using HASH160: `commitment = RIPEMD160(SHA256(script))`
3. The output script follows a simple template: `OP_HASH160 <commitment> OP_EQUAL`
4. When spending, the input script includes the full redemption script plus data to satisfy it: `<data> <redemption script>`

For example, to create a 2-of-2 multisignature requirement:
```
Redemption script: <public key 1> OP_CHECKSIGVERIFY <public key 2> OP_CHECKSIG
Output script: OP_HASH160 <hash of redemption script> OP_EQUAL
Input script: <signature2> <signature1> <redemption script>
```

P2SH addresses use Base58Check encoding with version prefix 0x05, resulting in addresses that start with "3". This innovation allowed complex scripts to be used without burdening senders with their complexity, enabling advanced features like multisignature setups.

However, P2SH has a security limitation: it's vulnerable to collision attacks when multiple parties construct the redemption script, offering only 80 bits of collision resistance in these scenarios instead of the expected 160 bits.