## Elliptic Curve Cryptography

Bitcoin Cash uses a specific elliptic curve called secp256k1, defined by the equation y² = (x³ + 7) mod p, where p is a large prime number (2^256 – 2^32 – 2^9 – 2^8 – 2^7 – 2^6 – 2^4 – 1). This curve is defined over a finite field of prime order instead of real numbers, appearing as a pattern of dots in two dimensions.

Points on the elliptic curve have special properties that make them useful for cryptography. In elliptic curve math, there's a "point at infinity" (similar to zero in addition) and an addition operator with properties resembling traditional addition. Given two points P1 and P2 on the curve, their sum P3 = P1 + P2 is found by drawing a line between them, finding where it intersects the curve, and reflecting that point across the x-axis.

Multiplication is defined as repeated addition. For a point P and an integer k, the product kP equals P added to itself k times. This operation is computationally efficient in one direction but extremely difficult to reverse, forming the basis of elliptic curve cryptography's security.