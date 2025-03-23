## Deterministic Key Derivation

Deterministic key derivation uses cryptographic hash functions to transform a single random seed into practically unlimited sets of seemingly random values. When the same seed is used with the same hash function, it will always produce the same set of values.

For example:
```
# Collect some entropy (randomness)
$ dd if=/dev/random count=1 status=none | sha256sum
f1cc3bc03ef51cb43ee7844460fa5049e779e7425a6349c8e89dfbb0fd97bb73  -

# Set our seed to the random value
$ seed=f1cc3bc03ef51cb43ee7844460fa5049e779e7425a6349c8e89dfbb0fd97bb73

# Deterministically generate derived values
$ for i in {0..2} ; do echo "$seed + $i" | sha256sum ; done
50b18e0bd9508310b8f699bad425efdf67d668cb2462b909fdb6b9bd2437beb3  -
a965dbcd901a9e3d66af11759e64a58d0ed5c6863e901dfda43adcd5f8c744f3  -
19580c97eb9048599f069472744e51ab2213f687d4720b0efc5bb344d624c3aa  -
```

This approach allows a user to backup just their seed value (typically 32 bytes) rather than backing up each individual key. Even with millions of different addresses receiving bitcoins, all the user needs to back up is their seed and reference to the deterministic algorithm used.