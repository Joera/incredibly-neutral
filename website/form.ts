async function submitForm(tokenId, ipfsCID) {
  const contract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", abi, signer);
  const isUsed = await contract.isUsed(tokenId);
  if (isUsed) {
    console.error("This NFT has already been used for a submission.");
    return;
  }
  await contract.submitForm(tokenId, ipfsCID);
  console.log("Form submitted successfully.");
}