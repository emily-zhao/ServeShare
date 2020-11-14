import ContractClient from './ContractClient';

export default class ResourceContractClient extends ContractClient{

    constructor(sender){
        super(sender);
        this.contractName = 'resource_contract';
    }
    
    getMyBalance(){
        return this.getContractVariable(
            this.contractName, 'balances', this.sender
        );
    }
    
    getMyOffer(){
        return this.getContractVariable(
            this.contractName, 'resource_offers', this.sender
        );
    }
    
    postOffer(price, address){
        return this.runTransaction(
            this.contractName, 'create_offer',
            {'price': price, 'address': address}
        );
    }
    
    purchaseOffer(offer){
        return this.runTransaction(
            this.contractName, 'purchase_offer',
            {'offer': offer}
        );
    }
    
    addToMyBalance(amount){
        return this.runTransaction(
            this.contractName, 'free_cash',
            {'amount': amount}
        );
    }
}
