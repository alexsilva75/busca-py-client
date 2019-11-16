class HttpService{

    post(url, termos){
        return new Promise((resolve, reject) =>{

                try{
                    console.log("Criando JSON em POST HttpService");
                    let pesquisaJson = {"url": url, "termos": termos};        
            
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', "https://busca-termos.herokuapp.com/pesquisa", true);
        
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onreadystatechange = function(){
                        if(this.readyState == 4 && this.status == "201"){
                            let resposta= JSON.parse(this.responseText);
                            resolve(resposta);

                        }else{
                            //console.log(xhr.responseText);
                            //
                        }//else               
                
                    }//fim xhr       
                    xhr.send(JSON.stringify(pesquisaJson));
                }catch(Error){
                    reject(xhr.responseText);
                }

            
            }//(resolve, reject) =>
            
        );//fim new Promise
    }//fim post


    obtemLinks(url){

        return new Promise( (resolve, reject) => {
            
            try{
                
                let pesquisaJson = {"url": url};        
        
                let xhr = new XMLHttpRequest();
                xhr.open('POST', "https://busca-termos.herokuapp.com/links", true);
    
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == "201"){
                        let resposta= JSON.parse(this.responseText);
                        console.log(`Pegando Links: ${resposta.links}`);
                        resolve(resposta.links);

                    }else{
                        //console.log(xhr.responseText);
                        //
                    }//else               
            
                }//fim xhr       
                xhr.send(JSON.stringify(pesquisaJson));
            }catch(Error){
                reject(xhr.responseText);
            }

        });//fim Promise
        

    }//obtemLinks

}//fim HttpService