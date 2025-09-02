import { AUTH_METHOD_TYPE, AUTH_METHOD_SCOPE } from "@lit-protocol/constants";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import { convertIpfsCid } from "../lib/ipfs.js";
import { ethers as ethers5 } from "ethers5";



export const mintPkpOpen = async (
    litContracts: LitContracts,

) => {

    const mintTx =
    await litContracts.pkpHelperContract.write.mintNextAndAddAuthMethods(
        2, // keyType (ECDSA)
        [], // permittedAuthMethodTypes: empty array means no restrictions
        [], // permittedAuthMethodIds
        [], // permittedAuthMethodPubkeys
        [], // permittedAuthMethodScopes
        false, // addPkpEthAddressAsPermittedAddress
        false, // sendPkpToItself
       { value: await litContracts.pkpNftContract.read.mintCost() }
    );

    const mintTxReceipt = await mintTx.wait();

    return getPkpInfoFromMintTxReceipt({
        txReceipt: mintTxReceipt,
        litContractsClient: litContracts,
    });
}
 
export const mintPkpWithLitAction = async (
    litContracts: LitContracts,
    cid: string

) => {

    const mintTx =
    await litContracts.pkpHelperContract.write.mintNextAndAddAuthMethods(
      AUTH_METHOD_TYPE.LitAction, // keyType
      [AUTH_METHOD_TYPE.LitAction], // permittedAuthMethodTypes
      [convertIpfsCid({ cid: cid, outputFormat: "hex" })],
      ["0x"], // permittedAuthMethodPubkeys
      [[AUTH_METHOD_SCOPE.SignAnything]], // permittedAuthMethodScopes
      false, // addPkpEthAddressAsPermittedAddress
      false, // sendPkpToItself
      { value: await litContracts.pkpNftContract.read.mintCost() }
    );
  const mintTxReceipt = await mintTx.wait();

  return getPkpInfoFromMintTxReceipt({
    txReceipt: mintTxReceipt,
    litContractsClient: litContracts,
  });

}

export const mintPkpWithLitActionAuthMethod = async (
  litContracts: LitContracts,
  mainActionCid: string,
  rootUpdateActionCid: string
) => {
  const mintTx =
    await litContracts.pkpHelperContract.write.mintNextAndAddAuthMethods(
      AUTH_METHOD_TYPE.LitAction, // keyType
      [AUTH_METHOD_TYPE.LitAction, AUTH_METHOD_TYPE.LitAction], // permittedAuthMethodTypes
      [
        convertIpfsCid({ cid: mainActionCid, outputFormat: "hex" }),
        convertIpfsCid({ cid: rootUpdateActionCid, outputFormat: "hex" }),
      ],
      ["0x", "0x"], // permittedAuthMethodPubkeys
      [[AUTH_METHOD_SCOPE.SignAnything], [AUTH_METHOD_SCOPE.SignAnything]], // permittedAuthMethodScopes
      false, // addPkpEthAddressAsPermittedAddress
      false, // sendPkpToItself
      { value: await litContracts.pkpNftContract.read.mintCost() }
    );
  const mintTxReceipt = await mintTx.wait();

  return getPkpInfoFromMintTxReceipt({
    txReceipt: mintTxReceipt,
    litContractsClient: litContracts,
  });
};

const getPkpInfoFromMintTxReceipt = async ({
  txReceipt,
  litContractsClient,
}: {
  txReceipt: ethers5.ContractReceipt;
  litContractsClient: LitContracts;
}) => {
  if (!txReceipt.events) {
    throw new Error("No events found in transaction receipt");
  }

  const pkpMintedEvent = txReceipt.events.find(
    (event: any) =>
      event.topics[0] ===
      "0x3b2cc0657d0387a736293d66389f78e4c8025e413c7a1ee67b7707d4418c46b8"
  );

  if (!pkpMintedEvent?.data) {
    throw new Error("PKP minted event data not found");
  }

  const publicKey = "0x" + pkpMintedEvent.data.slice(130, 260);
  const tokenId = ethers5.utils.keccak256(publicKey);
  const ethAddress = await litContractsClient.pkpNftContract.read.getEthAddress(
    tokenId
  );

  return {
    tokenId: ethers5.BigNumber.from(tokenId).toString(),
    publicKey,
    ethAddress,
  };
};
