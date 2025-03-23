## Transaction Serialization Format

A serialized Bitcoin transaction is a structured binary format used to transmit transaction data across the Bitcoin network. Here's an example of Alice's serialized transaction in hexadecimal:

```
01000000000101eb3ae38f27191aa5f3850dc9cad00492b88b72404f9da13569
8679268041c54a0100000000ffffffff02204e0000000000002251203b41daba
4c9ace578369740f15e5ec880c28279ee7f51b07dca69c7061e07068f8240100
000000001600147752c165ea7be772b2c0acb7f4d6047ae6f4768e0141cf5efe
2d8ef13ed0af21d4f4cb82422d6252d70324f6f4576b727b7d918e521c00b51b
e739df2f899c49dc267c0ad280aca6dab0d2fa2b42a45182fc83e81713010000
0000
```

This format is special because it's used to make commitments to transactions and relay them across Bitcoin's P2P network. While programs could use different formats internally, Bitcoin Core's format is reasonably compact and simple to parse, so many other Bitcoin programs use it.

The only other widely used transaction serialization format is the partially signed bitcoin transaction (PSBT) format documented in BIPs 174 and 370. PSBT allows an untrusted program to produce a transaction template that can be verified and updated by trusted programs with the necessary private keys.