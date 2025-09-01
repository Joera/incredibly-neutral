import { ethers as ethers5 } from "ethers5";
import { ethers } from "ethers";
import Safe from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";

const dev = true;

const CONFIG = "QmUnPw1ZG1btWC6jsidALXGD1hoKgNFLHd694tLdHzKsUm";
const PROTOCOL_ADDRESS = dev
  ? process.env.PROTOCOL_PROXY_ADDRESS_DEV!
  : process.env.PROTOCOL_PROXY_ADDRESS!;

export const updateProtocol = async (pkpInfo: any, mainActionCid: any, rootUpdateActionCid: any) => {

  const wallet = new ethers5.Wallet(process.env.PRIVATE_KEY!);

  const protocolKit = await Safe.init({
    provider: process.env.BASE_SEPOLIA_RPC_URL!,
    signer: process.env.PRIVATE_KEY!,
    safeAddress: process.env.PROTOCOL_SAFE_ADDRESS!,
  });

  const apiKit = new SafeApiKit({
    chainId: 84532n,
  });

  // Get Protocol contract instance for encoding transactions
  const Protocol = await ethers.getContractFactory("Protocol");
  const protocol = Protocol.attach(PROTOCOL_ADDRESS);

  console.log("mainActionCid.IpfsHash", mainActionCid.IpfsHash);

  // Prepare transactions
  const transactions: any[] = [
    {
      to: PROTOCOL_ADDRESS,
      data: (await protocol.setConfig.populateTransaction(CONFIG)).data!,
      value: "0",
    },
    {
      to: PROTOCOL_ADDRESS,
      data: (await protocol.setPKP.populateTransaction(pkpInfo.publicKey))
        .data!,
      value: "0",
    },
    {
      to: PROTOCOL_ADDRESS,
      data: (
        await protocol.setLitActionMain.populateTransaction(
          mainActionCid.IpfsHash
        )
      ).data!,
      value: "0",
    },
    {
      to: PROTOCOL_ADDRESS,
      data: (
        await protocol.setLitActionRootUpdate.populateTransaction(
          rootUpdateActionCid.IpfsHash
        )
      ).data!,
      value: "0",
    },
    // {
    //   to: PROTOCOL_ADDRESS,
    //   data: (await protocol.setLitActionRenderer.populateTransaction(RENDERER_ACTION)).data!,
    //   value: "0"
    // }
  ];

  // Create batch transaction
  console.log("Creating Safe transaction...");
  const safeTransaction = await protocolKit.createTransaction({
    transactions: transactions.map((tx) => ({
      ...tx,
      operation: OperationType.Call,
    })),
  });

  // Get transaction hash and sign it
  console.log("Signing transaction...");
  const safeTxHash = await protocolKit.getTransactionHash(safeTransaction);
  const senderSignature = await protocolKit.signHash(safeTxHash);

  // Propose transaction to Safe
  console.log("Proposing transaction to Safe...");
  await apiKit.proposeTransaction({
    safeAddress: process.env.PROTOCOL_SAFE_ADDRESS!,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: await wallet.getAddress(),
    senderSignature: senderSignature.data,
  });

  console.log("\nTransactions proposed to Safe!");
  console.log("Safe Tx Hash:", safeTxHash);
  console.log(
    "\nPlease review and execute the transaction in the Safe web interface."
  );
}