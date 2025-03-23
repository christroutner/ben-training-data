## Encrypted Keys and Paper Wallets

Private keys must remain confidential while also remaining available, creating competing security objectives. BIP0038 provides a standard for encrypting private keys with a passphrase, allowing for secure backups and transport between wallets.

BIP0038 takes a private key in WIF format and a passphrase, using the Advanced Encryption Standard (AES) to produce an encrypted key starting with the prefix '6P'. This encrypted key requires the passphrase to be decrypted back to a usable WIF format. Many wallet applications recognize and prompt for the passphrase when importing such keys.

```javascript
// Example of BIP0038 encryption with BITBOX
bitbox.BitcoinCash.encryptBIP38(
  "L1phBREbhL4vb1uHHHCAse8bdGE5c7ic2PFjRxMawLzQCsiFVbvu",
  "9GKVkabAHBMyAf"
);
// Returns: 6PYU2fDHRVF2194gKDGkbFbeu4mFgkWtVvg2RPd2Sp6KmZx3RCHFpgBB2G
```

Paper wallets are private keys printed on paper, often with the corresponding address for convenience. They provide an effective cold storage solution by keeping keys offline and physically secure. Paper wallets can be generated using client-side tools and stored in secure locations like safes. Simple paper wallets include just the printed address and private key, while more sophisticated designs add features like holographic seals or tamper-evident materials.