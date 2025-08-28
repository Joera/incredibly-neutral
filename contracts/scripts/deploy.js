const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const IncrediblyNeutralInvite = await hre.ethers.getContractFactory("IncrediblyNeutralInvite");
  const nftContract = await IncrediblyNeutralInvite.deploy();

  await nftContract.deployed();

  console.log("IncrediblyNeutralInvite deployed to:", nftContract.address);

  // Verify the contract on Etherscan
  try {
    await hre.run("verify:verify", {
      address: nftContract.address,
      constructorArguments: [],
    });
    console.log("Contract verified successfully on Etherscan.");
  } catch (error) {
    console.error("Error verifying contract:", error);
  }

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });