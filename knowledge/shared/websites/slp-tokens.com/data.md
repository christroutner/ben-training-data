---
sidebar_position: 4
---

# Data

The ability to attaching data to a token is what makes the technology really valuable. To start, we have to define a few important terms:

- **Mutable Data** - Data that can change over time.
- **Immutable Data** - Data that is fixed at the time of token creation. It can never be changed once set.
- **Genesis Data** - Data written directly to the blockchain to create the token.

Of the three, mutable data is the most interesting. Because a token can track data that changes over time, the token can represent items that also change over time. Some use-cases could be a video game character, a product as it travels through a supply chain, websites or social media content. Anything that needs to be tracked and changed over time. The mutable data can even contain software code that interacts with other software.

Even after the token leaves the possession of the token creator, the creator can retain the ability to update the mutable data. This allows artists to obtain royalties and enforce purchase contracts.

[Here is an example](https://slp-token.fullstack.cash/?tokenid=c9a6ed5c0cdef4f1ea8b71442fb75645cec3078e740db555320a16d5bbe94d74) of a token with all three data types defined above.

## Specifications

Mutable data is defined by the following specifications:

- **[PS002](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps002-slp-mutable-data.md)** - Core specification for attaching data to a token.
- **[PS007](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps007-token-data-schema.md)** - Defines a common schema for reading token data

The following JavaScript libraries are used for working with token data:

- [slp-mutable-data](https://www.npmjs.com/package/slp-mutable-data) - Core library for working with token data
- [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) - Contains high-level functions for reading token data.

## Data Hosting

The *Genesis Data* is the only data written to the blockchain. Because only a minimal amount of data is written to the blockchain, it prevents blockchain bloat and will scale well into the future.

The *Mutable* and *Immutable* data can be hosted anywhere, but is generally hosted on [IPFS](https://ipfs.io), a decentralized network for distributing data. The [PSF File Pinning Protocol](https://psffpp.com/docs/intro/) was specifically developed for hosting this data. It allows token data to be redundently hosted by decentralized network of computers. Hosting costs are very low.

## Mutable Data

Mutable data is tracked by a *Mutable Data Address* (**MDA**), which is a standard Bitcoin Cash address. The transaction history of that address is used to track the data as it changes over time. This creates an immutable record of updates. Every change to the data is tracked on the blockchain. The address acts as a *pointer* to the latest data, and all the historical updates are recorded to the blockchain and can not be deleted.

The holder of the private key for that address is the only one who can update the data. This allows token creators to retain the ability to update data after the token leaves their possession. They can also pass on the private key to allow new parties to update the mutable data.