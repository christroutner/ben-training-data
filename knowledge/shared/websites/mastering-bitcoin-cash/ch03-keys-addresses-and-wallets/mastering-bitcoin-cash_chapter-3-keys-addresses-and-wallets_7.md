## Encoding Formats and Key Representations

Both private and public keys can be represented in multiple formats that encode the same underlying information but appear differently. These formats are designed to make keys easier to read and transcribe without introducing errors.

Private keys can be represented in plain hexadecimal format (64 hex digits), Wallet Import Format (WIF, starting with "5"), or WIF-compressed format (starting with "K" or "L"). For example, the same private key can be represented as:

```
Hex: 1e99423a4ed27608a15a2616a2b0e9e52ced330ac530edcc32c8ffc6a526aedd
WIF: 5J3mBbAH58CpQ3Y5RNJpUKPE62SQ5tfcvU2JpbnkeyhfsYB1Jcn
WIF-compressed: KxFC1jmwwCoACiCAWZ3eXa96mBM6tb3TYzGmf6YwgdGWZgawvrtJ
```

Public keys can be uncompressed (520 bits, prefix 04) or compressed (264 bits, prefix 02 or 03). Compressed public keys store only the x-coordinate and a prefix indicating whether y is even (02) or odd (03), reducing storage requirements by nearly 50%. Though derived from the same private key, compressed and uncompressed public keys produce different Bitcoin Cash addresses.