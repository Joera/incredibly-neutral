import ipfsOnlyHash from "typestub-ipfs-only-hash";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { ethers as ethers5 } from "ethers5";

export async function getLitActionIpfsCid({
  input,
  outputFormat,
}: {
  input: string;
  outputFormat: "base58" | "hex";
}): Promise<string> {
  const base58Cid = await ipfsOnlyHash.of(input);
  if (outputFormat === "base58") {
    return base58Cid;
  } else {
    return `0x${Buffer.from(ethers5.utils.base58.decode(base58Cid)).toString(
      "hex"
    )}`;
  }
}

export function convertIpfsCid({
  cid,
  outputFormat,
}: {
  cid: string;
  outputFormat: "base58" | "hex";
}): string {
  if (outputFormat === "base58") {
    return cid;
  } else {
    return `0x${Buffer.from(ethers5.utils.base58.decode(cid)).toString("hex")}`;
  }
}

export const uploadToPinata = async (filePath: string) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  try {
    const response = await axios.post(url, formData, {
      maxBodyLength: Infinity,
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY!.trim(),
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY!.trim(),
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response:", {
        status: error.response.status,
        data: error.response.data,
      });
    }
    throw error;
  }
}

// // Get the file path from command line arguments
// const filePath = process.argv[2];
// if (!filePath) {
//     console.error('Please provide a file path');
//     process.exit(1);
// }
