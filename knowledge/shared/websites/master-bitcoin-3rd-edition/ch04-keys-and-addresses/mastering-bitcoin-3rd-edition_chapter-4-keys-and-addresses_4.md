## Base58Check Encoding

To make Bitcoin addresses user-friendly and error-resistant, the protocol uses a special encoding called Base58Check. Base58 is similar to Base64 but omits easily confused characters (0, O, l, I) and symbols (+, /). The Base58 alphabet consists of:
```
123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
```

Base58Check adds a version prefix and checksum to the data being encoded:
1. Add a version prefix byte (e.g., 0x00 for P2PKH addresses)
2. Calculate a "double-SHA" checksum: `checksum = SHA256(SHA256(prefix||data))`
3. Take the first 4 bytes of this checksum and append them to the data
4. Encode the result (prefix + data + checksum) using Base58

This process creates addresses that are:
- Compact and easy to share
- Error-detecting (mistakes in transcription are almost always caught)
- Format-specific (different prefixes create visually distinguishable formats)

For example, P2PKH addresses begin with "1" (e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa), while P2SH addresses begin with "3". This encoding became the standard for Bitcoin addresses until the introduction of more advanced formats.