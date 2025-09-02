

declare global {

  const ethers: any;
  const LitActions: any;
}

const main = async () => {

    LitActions.setResponse({
        response: JSON.stringify({
            success: true,
        })
    })

};

main();
