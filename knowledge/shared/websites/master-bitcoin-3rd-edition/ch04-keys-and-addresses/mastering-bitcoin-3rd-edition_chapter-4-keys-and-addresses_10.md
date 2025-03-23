## Vanity Addresses

Vanity addresses are valid Bitcoin addresses containing human-readable patterns, like "1Love" or "1Kids". They're created through a brute-force process: repeatedly generating key pairs until finding one that produces an address with the desired pattern.

The difficulty increases exponentially with the pattern length:
- 4 characters (e.g., "1Kids"): requires checking about 11 million keys (≈1 minute on a desktop PC)
- 7 characters (e.g., "1KidsCha"): requires checking about 2.2 trillion keys (≈3-4 months)
- 10 characters (e.g., "1KidsCharit"): requires checking about 400 quadrillion keys (≈46,000 years)

Longer patterns typically require specialized hardware (GPUs) or vanity mining pools that outsource the work. Once found, vanity addresses function like any other Bitcoin address - the vanity pattern doesn't affect security.

However, vanity addresses have become rare in modern Bitcoin usage for two main reasons:
1. They're incompatible with deterministic wallet generation
2. Using the same address multiple times (address reuse) reduces privacy for both the recipient and those transacting with them

Unless these problems are solved, vanity addresses will likely remain uncommon despite their memorable appearance.