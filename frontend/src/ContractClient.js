const URL = "http://0.0.0.0:3737/"

export default class ContractClient{

    constructor(){
    
    }
    
    getAllContracts(){
        return this._clientGet('contracts');
    }
    
    getContractInformation(){
    
    }
    
    getContractVariable(){
    
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

}
