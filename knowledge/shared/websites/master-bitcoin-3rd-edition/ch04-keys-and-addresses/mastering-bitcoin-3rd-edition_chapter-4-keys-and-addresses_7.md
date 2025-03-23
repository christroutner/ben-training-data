## Bech32 and Segregated Witness

In 2017, Bitcoin introduced Segregated Witness (segwit), which prevents transaction ID manipulation and increases block capacity. This upgrade required new output script types, and a new address format called bech32 was created to support them.

Bech32 addresses solved several problems with Base58Check:

1. They use a single case (lowercase letters) plus numbers, making them easier to read aloud and transcribe
2. They can detect errors and help users locate where mistakes occurred during manual entry
3. They encode more efficiently in QR codes
4. They support a forward-compatible upgrade mechanism

A bech32 address consists of:
- A human-readable part (HRP) - "bc" for Bitcoin mainnet, "tb" for testnet
- A separator character "1"
- A data part containing the witness version and program
- A 6-character checksum

Example bech32 address: `bc1q9d3xa5gg45q2j39m9y32xzvygcgay4rgc6aaee`

However, bech32 had a flaw: certain addresses could have characters added or removed without invalidating the checksum. This was fixed in an updated format called bech32m, which is now used for segwit v1 (taproot) addresses and later versions, while the original bech32 remains used for segwit v0.