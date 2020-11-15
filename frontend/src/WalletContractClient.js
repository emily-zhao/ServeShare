import WalletController from 'lamden_wallet_controller';
//import Lamden from 'lamden-js';

const BASE_URL = 'https://testnet-master-1.lamden.io/contracts/con_serveshare_contract/';

export default class WalletContractClient extends WalletController{
    constructor(){
        super({
            appName: 'ServeShare',
            version: '1.0.0',
            contractName: 'con_serveshare_contract',
            networkType: 'testnet',
            logo: './tau_logo.png'
        });
        this.connected = this.walletIsInstalled();
    }
    
    addToMyBalance(amount){
        return this.runTransaction('free_cash', {'amount': amount});
    }
    
    createOffer(price, address){
        return this.runTransaction('create_offer',
            {'price': price, 'address': address});
    }
    
    purchaseOffer(offer){
        return this.runTransaction('purchase_offer', {'offer': offer});
    }
    
    runTransaction(method, args){
        return new Promise((resolve, reject) => {
            this.connected.then(connected => {
                console.log(connected);
                if(connected){
                    console.log('connected and ready to send');
                    this.sendTransaction({
                        networkType: 'testnet',
                        methodName: method,
                        kwargs: args,
                        stampLimit: 1000
                    }, resolve);
                }else{
                    reject('not connected to wallet');
                }
            });
        });
    }
    
    
    
    _clientGet(path){
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.onload = () => resolve(req.responseText);
            console.log(BASE_URL + path);
            req.open("GET", URL + path);
            req.send();
        });
    }
}
