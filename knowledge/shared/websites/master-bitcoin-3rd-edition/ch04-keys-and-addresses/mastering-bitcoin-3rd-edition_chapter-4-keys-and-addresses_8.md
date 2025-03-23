## Different Script and Address Types

Bitcoin has evolved through several address types, each representing different script patterns:

**P2PK (Pay to Public Key)**
- Earliest form, rarely used today
- Output script: `<pubkey> OP_CHECKSIG`
- Input script: `<signature>`

**P2PKH (Pay to Public Key Hash)**
- Legacy addresses starting with "1"
- Output script: `OP_DUP OP_HASH160 <pubkey hash> OP_EQUALVERIFY OP_CHECKSIG`
- Input script: `<signature> <pubkey>`

**P2SH (Pay to Script Hash)**
- Legacy addresses starting with "3"
- Output script: `OP_HASH160 <script hash> OP_EQUAL`
- Input script: `<data> <redeem script>`

**P2WPKH (Pay to Witness Public Key Hash)**
- Segwit v0 bech32 addresses
- Witness program contains a public key hash
- Example: `bc1q9d3xa5gg45q2j39m9y32xzvygcgay4rgc6aaee`

**P2WSH (Pay to Witness Script Hash)**
- Segwit v0 bech32 addresses
- Witness program contains a 32-byte SHA256 script hash
- Example: `bc1qvj9r9egtd7mu2gemy28kpf4zefq4ssqzdzzycj7zjhk4arpavfhsct5a3p`

**P2TR (Pay to Taproot)**
- Segwit v1 bech32m addresses
- Witness program contains a taproot output key
- Example: `bc1p9nh05ha8wrljf7ru236awm4t2x0d5ctkkywmu9sclnm4t0av2vgs4k3au7`

Modern wallets primarily use bech32 and bech32m addresses, while legacy address types remain supported for backward compatibility.