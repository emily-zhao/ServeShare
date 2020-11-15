import WalletController from 'lamden_wallet_controller';
//import Lamden from 'lamden-js';

const BASE_URL = 'https://testnet-master-1.lamden.io/contracts/con_serveshare_contract/';

export default class WalletContractClient extends WalletController{
    constructor(){
        super({
            appName: 'ServeShare',
            version: '1.0.0',
            contractName: 'con_serveshare_contract4',
            networkType: 'testnet',
            logo: 'http://max1000000.net/serveshare/favicon-32x32.png'
        });
        this.connected = this.walletIsInstalled();
    }
    
    getMyBalance(){
        return this.runTransaction('my_balance', {});
    }
    
    getMyOffer(){
        return this.runTransaction('my_offer', {});
    }
    
    getAllOffers(){
        return this.runTransaction('all_offers', {});
    }
    
    addToMyBalance(amount){
        return this.runTransaction('free_cash', {'amount': amount});
    }
    
    subtractFromMyBalance(amount){
        return this.runTransaction('remove_cash', {'amount': amount});
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
                    }, resp => {
                        console.log(resp);
                        if(resp.data && resp.data.resultInfo
                            && resp.data.resultInfo.returnResult){
                        
                            resolve(resp.data.resultInfo.returnResult);
                        }else{
                            resolve(resp);
                        }
                    });
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
