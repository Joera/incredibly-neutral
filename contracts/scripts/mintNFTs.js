const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const IncrediblyNeutralInvite = await hre.ethers.getContractFactory("IncrediblyNeutralInvite");
  const nftContract = await IncrediblyNeutralInvite.attach("YOUR_CONTRACT_ADDRESS");

  // Seed for generating unique token IDs
  const seed = Math.floor(Math.random() * 1000000);

  // Number of NFTs to mint
  const batchSize = 24;

  // Mint the batch of NFTs
  await nftContract.mintBatch(owner.address, seed, batchSize);
  console.log(`Minted a batch of ${batchSize} NFTs with seed: ${seed}.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });