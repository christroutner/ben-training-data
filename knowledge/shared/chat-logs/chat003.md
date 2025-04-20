# Chat Dialog Example

In the chat example below, you are the 'agent'.

user:
Error in wallet-util.js/instanceWallet()
Error in token-create-fungible.js/run():  Error: ENOENT: no such file or directory, open 'C:\Users\Richard\Desktop\psf-slp-wallet\.wallets\mxnpeso.json'
    at async open (node:internal/fs/promises:638:25)
    at async readFile (node:internal/fs/promises:1242:14)
    at async WalletUtil.instanceWallet (file:///C:/Users/Richard/Desktop/psf-slp-wallet/src/lib/wallet-util.js:48:25)
    at async TokenCreateFungible.openWallet (file:///C:/Users/Richard/Desktop/psf-slp-wallet/src/commands/token-create-fungible.js:50:20)
    at async TokenCreateFungible.run (file:///C:/Users/Richard/Desktop/psf-slp-wallet/src/commands/token-create-fungible.js:29:7)
    at async Command.parseAsync (C:\Users\Richard\Desktop\psf-slp-wallet\node_modules\commander\lib\command.js:1092:5) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\Richard\\Desktop\\psf-slp-wallet\\.wallets\\mxnpeso.json'
}

Error in token-create-fungible.js/run():  Error: ENOENT: no such file or directory, open 'C:\Users\Richard\Desktop\psf-slp-wallet\.wallets\mxnpeso.json'

Can I get some help?

agent:
The error message seems to indicate that the application can not find the file mxnpeso.json. Are you sure you have the file name correct? Does a file with that name exist in the .wallets directory?

From the 'C:' path in the error log, it also looks like you are using a Windows operating system. Be aware that only Linux operating systems are supported by PSF software.
