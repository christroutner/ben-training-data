## Network Privacy and Security

The original Bitcoin implementation communicates entirely in the clear. To increase privacy and security, Bitcoin Core offers Tor transport integration. Tor (The Onion Routing network) provides encryption and data encapsulation through randomized network paths, offering anonymity and privacy.

Bitcoin Core can automatically set up a hidden Tor service if it can connect to a local Tor service. With Tor installed and proper permissions, Bitcoin Core will add a hidden service to the Tor network, allowing other Tor nodes to connect directly to your node over the encrypted Tor network.