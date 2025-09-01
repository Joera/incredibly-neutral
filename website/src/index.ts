
import { MainController } from './main';
import { verify } from './verify' 

const devNetterII = "0x4729d7061db66Bc8EDe9d7eB5c71c5fd0a47749c";

window.addEventListener('load', function() {
    const params = new URLSearchParams(location.search);
    
    // Get all params as an object
    const allParams = Object.fromEntries(params);
    console.log(allParams);
    
    // Or get individual params
    const uid = params.get('uid') || "";
    if (verify(uid, devNetterII)) {
        // Do something with the parameter
        const main = new MainController();
       
    } else {

    }

});


