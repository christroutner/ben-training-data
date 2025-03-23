## Private Key Formats

A Bitcoin private key is fundamentally a 256-bit number, but it can be represented in several formats for different use cases:

1. **Hexadecimal Format**
   - 64 hexadecimal digits (each representing 4 bits)
   - Example: `1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD`

2. **Wallet Import Format (WIF)**
   - Base58Check encoding with version prefix 0x80
   - Example: `5J3mBbAH58CpQ3Y5RNJpUKPE62SQ5tfcvU2JpbnkeyhfsYB1Jcn`

3. **WIF-compressed**
   - Same as WIF but with added suffix 0x01 before encoding
   - Results in addresses starting with K or L
   - Example: `KxFC1jmwwCoACiCAWZ3eXa96mBM6tb3TYzGmf6YwgdGWZgawvrtJ`

The "compressed" in WIF-compressed doesn't mean the private key itself is compressed (it's actually one byte longer). Instead, it signals that this private key should be used to derive compressed public keys. This distinction is important because a single private key can create two different addresses depending on whether compressed or uncompressed public keys are used.

Private key formats were primarily important in early Bitcoin wallets where keys were individually generated and managed. Modern deterministic wallets typically don't expose individual private keys, instead using seed phrases to backup all keys at once.