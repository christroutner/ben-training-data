## BIP39 Recovery Codes in Detail

BIP39 recovery codes represent a random number used as a seed to derive a deterministic wallet. The generation process has two main parts:

**Generating a recovery code:**
1. Create a random sequence (entropy) of 128 to 256 bits
2. Create a checksum of the random sequence by taking the first few bits of its SHA256 hash
3. Add the checksum to the end of the random sequence
4. Split the result into 11-bit segments
5. Map each 11-bit value to a word from a predefined dictionary of 2,048 words
6. The resulting sequence of words is the recovery code

**From recovery code to seed:**
7. The recovery code from step 6 represents the entropy
8. This entropy is put through PBKDF2 key-stretching with the salt "mnemonic" plus an optional passphrase
9. PBKDF2 stretches the recovery code using 2,048 rounds of HMAC-SHA512 hashing, producing a 512-bit seed

The relationship between entropy size and recovery code length is:
- 128 bits entropy → 12 words
- 160 bits entropy → 15 words
- 192 bits entropy → 18 words
- 224 bits entropy → 21 words
- 256 bits entropy → 24 words

Most modern wallets use 128 bits of entropy for their recovery codes, which provides sufficient security for Bitcoin applications.