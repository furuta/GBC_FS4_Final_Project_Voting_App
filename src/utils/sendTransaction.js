import { ethers } from 'ethers'

const NETWORK = 'HTTP://127.0.0.1:7545'

export default async function sendTransaction({ valueInEth, gas, toAddress, msg}) {
  const accounts = await window.ethereum.enable()
  console.log('Accounts found:', accounts)

  let provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
  const gasPrice = await provider.getGasPrice()

  let parameters = () => {
      if (valueInEth === 0) {
          return({
            to: toAddress,
            from: accounts[0],
            gas: ethers.utils.hexlify(gas),
            gasPrice: gasPrice.toHexString(),
            
            data: msg ? ethers.utils.hexlify(ethers.utils.toUtf8Bytes(msg)) : ""
          });
      } else {
          return({
            to: toAddress,
            from: accounts[0],
            gas: ethers.utils.hexlify(gas),
            gasPrice: gasPrice.toHexString(),
            value: ethers.utils.parseEther(valueInEth).toHexString(),
            data: msg ? ethers.utils.hexlify(ethers.utils.toUtf8Bytes(msg)) : ""
          });
      }
  }
  
  
  

  console.log('Sending transaction with params:', parameters())
  const response = await window.ethereum.send('eth_sendTransaction', [
    parameters(),
  ])

  console.log(
    'Sent transaction: %o',
    `https://${NETWORK}.etherscan.io/tx/${response.result}`,
  )
}