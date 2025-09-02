
require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const main = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const formData = new FormData();
  formData.append("file", fs.createReadStream("./actions/dist/main.js"));

  try {
    const response = await axios.post(url, formData, {
      maxBodyLength: Infinity,
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY.trim(),
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY.trim(),
      },
    });
    console.log(response.data.IpfsHash);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", {
        status: error.response.status,
        data: error.response.data,
      });
    }
    throw error;
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    process.exit(0);
  });
