const URL = "http://0.0.0.0:3737/"

// Example: client.runTransAction('my_token','free_cash', {'amount':5}, 'me')

export default class ContractClient{

    constructor(){
    
    }
    
    getAllContracts(){
        return this._clientGet('contracts');
    }
    
    getContractInformation(contract){
        return this._clientGet('contracts/' + contract);
    }
    
    getContractVariable(contract, variable, key){
        return this._clientGet(`contracts/${contract}/${variable}?key=${key}`);
    }
    
    runTransAction(contract, method, args, sender){
        return this._clientPost({
            'contract': contract,
            'method': method,
            'args': args,
            'sender': sender
        });
    }
    
    _clientGet(path){
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.onload = () => resolve(req.responseText);
            console.log(URL + path);
            req.open("GET", URL + path);
            req.send();
        });
    }
    
    _clientPost(data){
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.onload = () => resolve(req.responseText);
            console.log(URL);
            req.open("POST", URL);
            req.setRequestHeader('Content-Type', 'application/json');
            console.log(JSON.stringify(data));
            req.send(JSON.stringify(data));
        });
    }

}
