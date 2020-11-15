import WalletContractClient from './WalletContractClient';

window.onload = () => {
    let contractClient = new WalletContractClient();
    //for debugging
    window.contractClient = contractClient;
};
