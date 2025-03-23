## Extended Marker and Flag

The next two fields after the version were added as part of the segregated witness (segwit) soft fork. These fields use the extended serialization format defined in BIP144.

For transactions that include a witness structure, the marker must be zero (0x00) and the flag must be non-zero. Currently, the flag should always be one (0x01), with alternative values reserved for future protocol upgrades.

If a transaction doesn't need a witness stack, the marker and flag must not be present. This maintains compatibility with the original legacy serialization format. In legacy serialization, the marker byte would have been interpreted as the number of inputs (zero), which is invalid since a transaction can't have zero inputs. This signals to modern programs that extended serialization is being used.