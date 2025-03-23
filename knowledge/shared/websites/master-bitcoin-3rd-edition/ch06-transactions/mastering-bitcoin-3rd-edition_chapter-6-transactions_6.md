## Input Script and Sequence

### Input Script

The input script field is a remnant of the legacy transaction format. For transactions spending native segwit outputs, this field is typically empty (length prefix set to zero). For transactions spending legacy outputs, this field contains the data needed to satisfy the conditions specified in the output being spent.

### Sequence Field

The final four bytes of an input are its sequence number. Originally intended to enable transaction replacement, the sequence field has evolved to serve multiple purposes:

1. **Original Transaction Replacement**: Initially designed to allow creation of multiple versions of the same transaction, with higher sequence numbers replacing lower ones. This was disabled due to potential abuse.

2. **Opt-in Transaction Replacement**: BIP125 repurposed the sequence field, allowing transactions with sequence values below 0xfffffffe to signal they are replaceable by transactions with higher fees (Replace-by-Fee or RBF).

3. **Relative Timelock**: BIP68 added a constraint that interprets sequence values less than 2^31 as relative timelocks. Such transactions can only be included in the blockchain after the previous output has aged by the specified amount.

The sequence value can be specified in either blocks or seconds, with a type-flag (bit 22) determining the unit. If the flag is set, the value is interpreted as a multiple of 512 seconds; if not set, the value is interpreted as a number of blocks.