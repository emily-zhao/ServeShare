import ContractClient from './ContractClient';

let printfn = x => console.log(x);

let meClient = new ContractClient('me');
let otherClient = new ContractClient('other');
meClient.getAllContracts().then(printfn);
window.contractClient = meClient;

Promise.resolve().then(
    meClient.runTransaction('resource_contract', 'free_cash', {'amount':10}).then(printfn)
).then(
    meClient.getContractVariable('resource_contract', 'balances', 'me').then(printfn)
).then(
    otherClient.runTransaction('resource_contract','create_offer', {'price':5, 'address': '1234'}).then(printfn)
).then(
    otherClient.getContractVariable('resource_contract', 'balances', 'other').then(printfn)
).then(
    otherClient.getContractVariable('resource_contract', 'resource_offers', 'other').then(printfn)
).then(
    meClient.runTransaction('resource_contract', 'purchase_offer', {'offer': 'other'}).then(printfn)
).then(
    meClient.getContractVariable('resource_contract', 'balances', 'me').then(printfn)
).then(
    otherClient.getContractVariable('resource_contract', 'balances', 'other').then(printfn)
).then(
    otherClient.getContractVariable('resource_contract', 'resource_offers', 'other').then(printfn)
);
