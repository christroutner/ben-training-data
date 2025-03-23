## Witness Structure Serialization

Unlike inputs and outputs fields, the witness structure doesn't start with an explicit count of witness stacks. Instead, this is implied by the inputs field—there's one witness stack for every input.

Each witness stack begins with a count of the number of witness items it contains. These items are then serialized as length-prefixed data elements. Legacy inputs don't contain any witness items, so their witness stack consists of just a count of zero (0x00).

The witness structure allows Bitcoin to separate authorization data (who can spend) from authentication data (proof of authorization), solving the circular dependency and malleability problems without breaking backward compatibility.