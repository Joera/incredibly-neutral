const parseCombined = (combinedString) => {
  // Code is always first 8 characters (4 bytes = 8 hex chars)
  const code = combinedString.substring(0, 8);
  // Signature is the rest (should be 132 chars for Ethereum signatures)
  const signature = combinedString.substring(8);
  
  return { code, signature };
};

export const verify = (combinedString, expectedAddress) => {
  try {
    const { code, signature } = parseCombined(combinedString);
    
    // Recreate the message hash
    const messageHash = ethers.keccak256(ethers.solidityPacked(['string'], [code]));
    
    // Recover the signer's address
    const recoveredAddress = ethers.verifyMessage(getBytes(messageHash), signature);
    
    // Check if it matches expected address
    const isValid = recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
    
    return {
      valid: isValid,
      code: code,
      signature: signature,
      recoveredAddress: recoveredAddress,
      expectedAddress: expectedAddress
    };
    
  } catch(error) {
    return {
      valid: false,
      error: error.message
    };
  }
};