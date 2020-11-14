import ResourceContractClient from './ResourceContractClient';

let printfn = (x, resolve) => {console.log(x); resolve()};

let meClient = new ResourceContractClient('me');
let otherClient = new ResourceContractClient('other');
//meClient.getAllContracts().then(printfn);
window.meClient = meClient;
window.otherClient = otherClient;

/*
Promise.resolve().then((resolve) => {
    meClient.addToMyBalance(5).then(printfn)
}).then((resolve) => {
    meClient.getMyBalance().then(printfn)
}).then((resolve) => {
    otherClient.getMyBalance().then(printfn)
}).then((resolve) => {
    otherClient.postOffer(5, 'abc').then(printfn)
}).then((resolve) => {
    otherClient.getMyOffer().then(printfn)
}).then((resolve) => {
    meClient.purchaseOffer('other').then(printfn)
}).then((resolve) => {
    otherClient.getMyOffer().then(printfn)
}).then((resolve) => {
    meClient.getMyBalance().then(printfn)
}).then((resolve) => {
    otherClient.getMyBalance().then(printfn)
});
*/
