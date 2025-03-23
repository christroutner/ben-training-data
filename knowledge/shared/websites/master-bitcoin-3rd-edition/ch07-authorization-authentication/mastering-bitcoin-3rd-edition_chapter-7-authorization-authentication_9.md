## Script Flow Control

Bitcoin Script supports conditional execution using flow control opcodes like `OP_IF`, `OP_ELSE`, and `OP_ENDIF`. Unlike most programming languages where the condition comes before the if statement, in Script the condition is evaluated before the `IF` opcode.

For example, a script offering two execution paths might look like:
```
OP_IF
  <Alice's Pubkey>
OP_ELSE
  <Bob's Pubkey>
OP_ENDIF
OP_CHECKSIG
```

Alice could satisfy this with:
```
<Alice's Sig> OP_TRUE
```

While Bob would use:
```
<Bob's Sig> OP_FALSE
```

Another form of conditional execution uses opcodes with the `VERIFY` suffix, which acts as a guard clause, terminating execution immediately if the condition is not met. For example:
```
OP_HASH160 <expected hash> OP_EQUALVERIFY <Bob's Pubkey> OP_CHECKSIG
```

These flow control constructs can be nested to create multiple execution paths, enabling complex authorization schemes with different conditions for spending.