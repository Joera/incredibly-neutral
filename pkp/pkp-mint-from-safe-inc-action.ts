
import { providers, Wallet, BigNumber, Overrides } from "ethers5";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import {
  LIT_NETWORK,
  LIT_RPC,
} from "@lit-protocol/constants";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import { uploadToPinata } from "./lib/ipfs"
import { mintPkpWithLitActionAuthMethod } from "./lib/mint";
import dotenv from "dotenv";
import { fundChain, fundYellowStone } from "./lib/fund";
import { logInfo } from "./lib/log";


dotenv.config();

async function main() {
  const provider = new providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE);
  const signer = new Wallet(process.env.PRIVATE_KEY!, provider);

  const client = new LitNodeClient({
    litNetwork: LIT_NETWORK.Datil,
  });
  await client.connect();

  const litContracts = new LitContracts({
    network: LIT_NETWORK.Datil,
    signer: signer,
  });

  await litContracts.connect();

  const mainActionCid = await uploadToPinata("./actions/dist/main/main.js");

  const rootUpdateActionCid = await uploadToPinata(
    "./actions/dist/updateEvm/main.js"
  );

  console.log("Main Action CID:", mainActionCid);
  console.log("Root Update Action CID:", rootUpdateActionCid);

  const pkpInfo = await mintPkpWithLitActionAuthMethod(
    litContracts,
    mainActionCid.IpfsHash,
    rootUpdateActionCid.IpfsHash
  );

  logInfo(pkpInfo, litContracts, signer);
  
  await fundYellowStone(pkpInfo, signer, provider)
  await fundChain('base-sepolia', pkpInfo);

  // specific for soul2soul
  // await updateProtocol()

   
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    process.exit(0);
  });

