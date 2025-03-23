## Scripted Multisignatures

Multisignature scripts set conditions where k out of t public keys must provide signatures to spend funds. For example, a 2-of-3 multisignature requires at least two signatures from three possible public keys.

The general form of a multisignature output script is:
```
t <Public Key 1> <Public Key 2> ... <Public Key k> k OP_CHECKMULTISIG
```

Where `t` is the threshold of required signatures and `k` is the total number of listed public keys.

For a 2-of-3 multisignature, the output script would be:
```
2 <Public Key A> <Public Key B> <Public Key C> 3 OP_CHECKMULTISIG
```

This can be satisfied with an input script containing any two valid signatures:
```
OP_0 <Signature B> <Signature C>
```

The `OP_0` at the beginning addresses an oddity in `OP_CHECKMULTISIG` implementation: it consumes one more item from the stack than expected. This "dummy stack element" must be present but is disregarded during signature verification. This quirk is now part of the consensus rules.