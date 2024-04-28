// pages/index.js

import { useState, useEffect } from 'react';
import Web3 from 'web3';

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          // Get accounts
          const accs = await web3Instance.eth.getAccounts();
          setAccounts(accs);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.error('No Ethereum provider detected');
      }
    }
    loadWeb3();
  }, []);

  const handleSendTransaction = async () => {
    if (web3 && accounts.length > 0) {
      try {
        const txHash = await web3.eth.sendTransaction({
          from: accounts[0],
          to: '0xRecipientAddress',
          value: web3.utils.toWei('1', 'ether'), // Sending 1 ETH
        });
        console.log('Transaction sent:', txHash);
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    }
  };

  return (
    <div>
      <h1>MetaMask Integration Example</h1>
      {web3 ? (
        <p>Connected to MetaMask</p>
      ) : (
        <p>Please connect to MetaMask</p>
      )}
      <button onClick={handleSendTransaction}>Send Transaction</button>
    </div>
  );
}
