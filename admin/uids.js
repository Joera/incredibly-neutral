const crypto = require('crypto');
const { ethers, getBytes } = require('ethers');

require('dotenv').config();

const signingKey = process.env.DEVNETTERII; 
const wallet = new ethers.Wallet(signingKey);

const generateCodes = async () => {
  const codes = [];
  
  for(let i = 0; i < 10; i++) { // Start with 10 for testing
    const code = crypto.randomBytes(4).toString('hex');
    
    // Create message hash (same as contract will do)
    const messageHash = ethers.keccak256(ethers.solidityPacked(['string'], [code]));
    
    // Sign the hash
    const signature = await wallet.signMessage(getBytes(messageHash));
    
    codes.push({
      code: code,
      signature: signature
    });
    
    console.log(`Code: ${code}`);
    console.log(`Signature: ${signature}`);
    console.log('---');
  }
  
  return codes;
};

generateCodes().then(() => {
  console.log('Done generating codes!');
}).catch(console.error);