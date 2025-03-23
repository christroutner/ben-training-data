## Seeds and Recovery Codes

Recovery codes are human-readable representations of the seed used to derive all keys in an HD wallet. These codes are typically encoded as sequences of words rather than hexadecimal digits, making them easier to write down and verify. For example:

**Hex-encoded:**
```
0C1E 24E5 9177 79D2 97E1 4D45 F14E 1A1A
```

**Word-encoded:**
```
army van defense carry jealous true
garbage claim echo media make crunch
```

Several recovery code standards exist:

1. **BIP39**: The most popular method for the past decade. Encodes random data with a checksum into 12-24 words.
2. **Electrum v2**: Used in the Electrum wallet, includes a version number for improved reliability.
3. **Aezeed**: Used in the LND wallet, includes two version numbers and a wallet birthday timestamp.
4. **Muun**: A non-word code used with a PDF containing encrypted private keys.
5. **SLIP39**: Allows a single seed to be distributed across multiple recovery codes with a configurable threshold.

Most recovery code systems support optional passphrases for added security. With BIP39, Electrum v2, and SLIP39, every passphrase (including using no passphrase) produces a different valid seed. This provides plausible deniability but also risk if a passphrase is mistyped during recovery. Aezeed, by contrast, authenticates its passphrase and will return an error if an incorrect value is provided.