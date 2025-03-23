## Scriptless Multisignatures and Pay to Contract

Traditional scripted multisignatures require multiple signatures and public keys to be placed on-chain, increasing transaction size and reducing privacy. Scriptless multisignatures offer an alternative approach.

In scriptless multisignatures, participants each create partial private keys and derive partial public keys. These public keys are combined to create a multisignature public key that looks identical to any regular Bitcoin public key. Similarly, participants generate partial signatures that are combined into a single signature.

The benefits include:
- Constant transaction size regardless of the number of participants
- Complete privacy - third parties can't tell if a signature came from one person or many
- Identical appearance to single-signature transactions

Pay to Contract (P2C) is another powerful technique where a public key is tweaked with a commitment to a contract or description. The sender adds the hash of the contract to the recipient's public key and pays to the resulting key. The recipient can spend by tweaking their private key with the same value.

This allows the sender to later prove what they paid for by revealing the original key and the contract description, while maintaining complete privacy unless the parties choose to reveal the details.