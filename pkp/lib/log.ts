export const logInfo = async (pkpInfo: any, litContracts: any, signer: any) => {


      console.log("PKP ID:", pkpInfo.tokenId);
      console.log("PKP Public Key:", pkpInfo.publicKey);
      console.log("PKP Eth Address:", pkpInfo.ethAddress);
    
      // Check PKP ownership
      const owner = await litContracts.pkpNftContract.read.ownerOf(pkpInfo.tokenId);
      console.log("PKP Owner:", owner);
      console.log("Signer address:", await signer.getAddress());
      if (owner.toLowerCase() !== (await signer.getAddress()).toLowerCase()) {
        throw new Error(
          "PKP ownership verification failed - owner does not match signer"
        );
      }
      console.log("✅ PKP successfully minted and owned by signer!");
    
      // Log final permissions
      const permittedAuthMethods =
        await litContracts.pkpPermissionsContract.read.getPermittedAuthMethods(
          pkpInfo.tokenId
        );
      console.log("\nPermitted Auth Methods:");
      permittedAuthMethods.forEach((method: any, i: number) => {
        console.log(`\nAuth Method ${i + 1}:`);
        console.log("- Type:", method.authMethodType);
        console.log("- ID:", method.id || "Any ETH address");
        console.log("- User PubKey:", method.userPubkey);
      });
    
      const permittedActions =
        await litContracts.pkpPermissionsContract.read.getPermittedActions(
          pkpInfo.tokenId
        );
      console.log("\nPermitted Actions:", permittedActions);
      console.log(
        "\nNOTE: Access control will be handled by Lit Action conditions")
}