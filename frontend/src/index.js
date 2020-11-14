import ContractClient from './ContractClient';

let client = new ContractClient();
client.getAllContracts().then(contracts => {
    console.log(contracts);
});
window.contractClient = client;
