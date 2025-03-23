## Output Scripts

The output script contains the conditions that will need to be fulfilled to spend the bitcoins. Its length is indicated by a compactSize integer, and according to consensus rules, the minimum size is zero.

While there's no explicit maximum size limit for an output script, a later transaction can only spend a previous output with a script of 10,000 bytes or smaller. Bitcoin Core's policy for relaying and mining transactions further limits output scripts to a few standard templates, encouraging best practices in script usage.

An output script with zero length can be spent by anyone (known as "anyone-can-spend"). These scripts are sometimes used for Bitcoin upgrades, where an existing anyone-can-spend script has new constraints added to it.