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
                    /*xhr.timeout = 120000;
                    xhr.ontimeout = () => { reject("Erro ao realizar pesquisa: a página demorou muito para responder. O servidor pode estar indisponível ou a URL pode estar incorreta."); }
*/
                    xhr.send(JSON.stringify(pesquisaJson));
                }catch(error){
                    throw new Error(error.message);
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

                /*xhr.timeout = 120000;
                xhr.ontimeout =  () => { reject("Erro ao obter links: a página demorou muito para responder. O servidor pode estar indisponível ou a URL pode estar incorreta."); }
*/
                xhr.send(JSON.stringify(pesquisaJson));
            }catch(error){
                throw new Error(error.message);
            }

        });//fim Promise
        

    }//obtemLinks

}//fim HttpService