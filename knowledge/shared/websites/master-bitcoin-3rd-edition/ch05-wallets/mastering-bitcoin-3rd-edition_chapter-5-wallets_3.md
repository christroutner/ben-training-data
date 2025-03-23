## Public Child Key Derivation

Modern wallets use a technique called public child key derivation that allows public keys to be derived separately from their corresponding private keys. This works because of properties of elliptic curve cryptography, where adding the same value to both sides of the key generation equation keeps everything consistent:

K + (123 × G) == (k + 123) × G

Where K is a public key, k is the corresponding private key, and G is the generator point of the elliptic curve.

This technique allows someone who only knows a public key to create an unlimited sequence of child public keys. The person who has the corresponding private key can then use the same sequence to create the matching private keys. This separation is powerful for security - the frontend wallet can distribute public keys without ever needing access to private keys, while a more secure hardware signing device can hold the private keys safely offline.

This arrangement is commonly used for hardware signing devices and provides a clear security boundary between the frontend wallet application (which distributes public keys) and the signing operations (which require private keys).