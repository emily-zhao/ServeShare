import WalletContractClient from './WalletContractClient';

function showMyBalance(client){
    return client.getMyBalance().then(balance => {
        document.getElementById('balance').innerHTML = balance;
    });
}

function showCodeResult(){
    document.getElementById('outputText').innerHTML = "hello world";
}

window.onload = () => {
    let outputText = document.getElementById('outputText');
    let contractClient = new WalletContractClient();
    //for debugging
    window.contractClient = contractClient;
    
    showMyBalance(contractClient).then(() => {
    
        contractClient.getAllOffers().then(offers => {
            console.log(offers.replaceAll("'", '"'));
            offers = JSON.parse(offers.replaceAll("'", '"'));
            for(let offer of offers){
                let opt = document.createElement('option');
                let price = offer.price + '';
                let space = new Array(5 - price.length)
                                .fill('&nbsp;').join('');
                opt.innerHTML = `(${price})${space}- ${offer.address}`;
                opt.value = offer.identity;
                document.getElementById('providers').add(opt);
            }
        });
    });
    
    document.getElementById('payButton').onclick = () => {
        outputText.innerHTML = "sending transaction...";
        let chosen = document.getElementById('providers').value;
        contractClient.purchaseOffer(chosen).then(() => {
            showMyBalance(contractClient);
            outputText.innerHTML = "transaction complete...\n sending code to host"
            window.setTimeout(showCodeResult, 1000);
        });
    }
};
