import { LIT_RPC, LIT_NETWORK } from "@lit-protocol/constants";
import { EthWalletProvider } from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { providers, Wallet } from "ethers5";

import dotenv from "dotenv";
dotenv.config();

async function create () {

    const provider = new providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE);
    const signer = new Wallet(process.env.PRIVATE_KEY!, provider);

    const litNodeClient = new LitNodeClient({
    litNetwork: LIT_NETWORK.Datil,
    });

    await litNodeClient.connect();

    const authSig = await EthWalletProvider.authenticate({
        signer: signer, // ethers.js signer instance
        litNodeClient,
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31 * 12 * 10).toISOString(), // 10 year
    });

    console.log(authSig);

}

create()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    process.exit(0);
  });
