import { ethers as ethers5 } from "ethers5";
import { providers, Wallet, BigNumber, Overrides } from "ethers5";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import {
  AUTH_METHOD_SCOPE,
  AUTH_METHOD_TYPE,
  LIT_NETWORK,
  LIT_RPC,

} from "@lit-protocol/constants";
import { LitContracts } from "@lit-protocol/contracts-sdk";

import dotenv from "dotenv";

import { logInfo } from "./lib/log.js";
import { fundChain, fundYellowStone } from "./lib/fund.js";
import { mintPkpOpen, mintPkpWithLitAction } from "./lib/mint.js";
 
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

   const pkpInfo = await mintPkpOpen(
    litContracts
  );

  logInfo(pkpInfo, litContracts, signer);

  await fundYellowStone(pkpInfo, signer, provider)
  // await fundChain("base", pkpInfo)
 
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    process.exit(0);
  });



