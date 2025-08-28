import { LitNodeClient } from 'https://cdn.skypack.dev/@lit-protocol/lit-node-client';
import { LIT_NETWORK } from 'https://cdn.skypack.dev/@lit-protocol/constants';


const lightUpLit = (uid) => {

        window.connectToLit = async function() {
            const statusDiv = document.getElementById('status');
            statusDiv.innerHTML = 'Connecting...';
            
            try {
                const client = new LitNodeClient({
                    litNetwork: LIT_NETWORK.DatilDev
                });
                
                await client.connect();
                statusDiv.innerHTML = 'Connected to Lit Network!';
                console.log('Lit client connected:', client);
                
                // Store client globally for other scripts
                window.litClient = client;
                
            } catch (error) {
                statusDiv.innerHTML = 'Error: ' + error.message;
                console.error('Connection error:', error);
            }
        }

}


window.addEventListener('load', function() {
    const params = new URLSearchParams(location.search);
    
    // Get all params as an object
    const allParams = Object.fromEntries(params);
    console.log(allParams);
    
    // Or get individual params
    const uid = params.get('uid');
    if (uid) {
        // Do something with the parameter
       lightUpLit(uid)
    }
});