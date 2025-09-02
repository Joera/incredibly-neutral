import { ethers as ethers5, providers, Wallet } from "ethers5";

export const fundYellowStone = async (pkpInfo: any, signer: any, provider: any) => {
    
    console.log(`🔄 Checking PKP balance...`, pkpInfo.ethAddress);
    let bal = await provider.getBalance(pkpInfo.ethAddress!);
    let formattedBal = ethers5.utils.formatEther(bal);
    
    if (Number(formattedBal) < Number(ethers5.utils.formatEther(25_000))) {
        console.log(
          `ℹ️  PKP balance: ${formattedBal} is insufficient to run example`
        );
        console.log(`🔄 Funding PKP...`);
    
        const fundingTx = {
          to: pkpInfo.ethAddress!,
          value: ethers5.utils.parseEther("0.001"),
          gasLimit: 21_000,
          gasPrice: (await signer.getGasPrice()).toHexString(),
          nonce: await provider.getTransactionCount(signer.address),
          chainId: provider.network.chainId,
        };
    
        const tx = await signer.sendTransaction(fundingTx);
        await tx.wait();
        console.log(`✅ Funded PKP on Chronicle Yellowstone with 0.001 tokens`);

    } else {
        console.log(`✅ PKP has a sufficient balance of: ${formattedBal}`);
    }
    
}

export const fundChain = async (chain: string, pkpInfo: any) => {

     console.log(`🔄 Funding PKP on Base Sepolia...`);
        const baseSepoliaProvider = new providers.JsonRpcProvider(
          "https://sepolia.base.org"
        );
        const baseSepoliaSigner = new Wallet(
          process.env.PRIVATE_KEY!,
          baseSepoliaProvider
        );
    
        const baseSepoliaFundingTx = {
          to: pkpInfo.ethAddress!,
          value: ethers5.utils.parseEther("0.00033"),
          gasLimit: 21_000,
          gasPrice: (await baseSepoliaSigner.getGasPrice()).toHexString(),
          nonce: await baseSepoliaProvider.getTransactionCount(
            baseSepoliaSigner.address
          ),
          chainId: 84532, // Base Sepolia chain ID
        };
    
        const baseTx = await baseSepoliaSigner.sendTransaction(
          baseSepoliaFundingTx
        );
        await baseTx.wait();
        console.log(`✅ Funded PKP on Base Sepolia with 0.001 ETH`);

}