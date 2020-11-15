import WalletContractClient from './WalletContractClient';

function showMyBalance(client){
    return client.getMyBalance().then(balance => {
        document.getElementById('balance').innerHTML = balance;
    });
}

function runOnHost(){
    document.getElementById('outputText').innerHTML = "running on host...";
    window.setTimeout(showCodeResult, 2000);
}

function showCodeResult(){
    document.getElementById('outputText').innerHTML =
        "4 9 8 4\n" +
        "7 6 6 3\n" +
        "2 4 0 2\n" +
        "5 6 3 4\n\n" +
        "3 9 2 4\n" +
        "3 0 9 7\n" +
        "9 9 0 4\n" +
        "2 0 8 4\n\n" +
        "9 1 3 7\n" +
        "9 1 7 4\n" +
        "6 2 1 9\n" +
        "9 5 6 6";
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
            window.setTimeout(runOnHost, 1000);
        });
    }
};
