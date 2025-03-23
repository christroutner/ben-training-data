## Extended Keys and Hardened Derivation

Extended keys are the combination of a key (private or public) and a chain code. An extended private key can derive complete branches of child private and public keys, while an extended public key can only derive child public keys. Extended keys are encoded using base58check with special version numbers that result in the prefixes "xprv" for private and "xpub" for public.

A vulnerability exists in the basic HD wallet design: if a child private key and parent chain code are known, all sibling private keys can be derived. To counter this risk, HD wallets provide hardened derivation, which breaks the relationship between parent public key and child chain code.

Hardened derivation uses the parent private key to derive the child chain code, instead of the parent public key. This creates a "firewall" that prevents compromise of parent or sibling keys. Index numbers for hardened derivation range from 2^31 to 2^32-1 and are displayed with a prime symbol (e.g., 0').

As a best practice, level-1 children of master keys are always derived through hardened derivation to prevent compromise of master keys. This means an extended public key should be derived from a hardened parent rather than a normal parent.