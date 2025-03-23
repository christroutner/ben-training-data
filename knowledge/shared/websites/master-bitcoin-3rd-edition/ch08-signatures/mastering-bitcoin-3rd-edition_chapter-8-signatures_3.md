## Signature Hash Types (SIGHASH)

Bitcoin signatures include SIGHASH flags that indicate which parts of a transaction are included in the hash signed by the private key. These flags allow signers to commit to specific portions of transaction data. There are three basic SIGHASH flags:

1. **SIGHASH_ALL (0x01)**: Signature applies to all inputs and outputs
2. **SIGHASH_NONE (0x02)**: Signature applies to all inputs, but none of the outputs
3. **SIGHASH_SINGLE (0x03)**: Signature applies to all inputs but only the output with the same index as the signed input

Additionally, there's a modifier flag called SIGHASH_ANYONECANPAY (0x80) that can be combined with the above flags using bitwise OR. When ANYONECANPAY is set, only one input is signed, leaving others open for modification:

| SIGHASH flag | Value | Description |
|--------------|-------|-------------|
| ALL\|ANYONECANPAY | 0x81 | Signature applies to one input and all outputs |
| NONE\|ANYONECANPAY | 0x82 | Signature applies to one input, none of the outputs |
| SINGLE\|ANYONECANPAY | 0x83 | Signature applies to one input and the output with the same index number |

These SIGHASH types enable various transaction constructions, such as crowdfunding-style transactions (ALL|ANYONECANPAY), bearer checks (NONE), and dust collectors (NONE|ANYONECANPAY). BIP118 proposes additional flags like SIGHASH_ANYPREVOUT for advanced use cases including payment channels in the Lightning Network.