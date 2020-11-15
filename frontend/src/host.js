import WalletContractClient from './WalletContractClient';

function showActiveOffer(client){
    client.getMyOffer().then(offer => {
        console.log(offer);
        document.getElementById('activeOffer').innerHTML = offer;
    });
}

window.onload = () => {
    let contractClient = new WalletContractClient();
    //for debugging
    window.contractClient = contractClient;
    
    showActiveOffer(contractClient);
    
    document.getElementById('hostButton').onclick = () => {
        let address = document.getElementById('InputAddress').value;
        let price = parseInt(document.getElementById('InputPrice').value);
        document.getElementById('activeOffer').innerHTML = 'sending transaction...';
        contractClient.createOffer(price, address).then(() => {
            showActiveOffer(contractClient);
        });;
    };
};
