import { LIT_RPC, LIT_NETWORK } from "@lit-protocol/constants";
import { EthWalletProvider } from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { providers, Wallet } from "ethers5";
import { delegateCapacityToken, mintCapacityToken } from "./lib/capacity.js";

import dotenv from "dotenv";

dotenv.config();


async function main ()  {

    const SELECTED_LIT_NETWORK = "";

    const provider = new providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE);
    const signer = new Wallet(process.env.PRIVATE_KEY!, provider);

    const litNodeClient = new LitNodeClient({
        litNetwork: LIT_NETWORK.Datil,
    });

    await litNodeClient.connect();

    const ctid = await mintCapacityToken(signer, litNodeClient, SELECTED_LIT_NETWORK);
    const dct = await delegateCapacityToken(signer, litNodeClient, ctid);

    console.log(dct);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    process.exit(0);
  });


