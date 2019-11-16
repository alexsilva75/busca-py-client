
function enviarPesquisa(event){
    try{
        console.log("Enviando pesquisa!");
        event.preventDefault();
        $ = document.querySelector.bind(document);

        let url = $('#basic-url').value;
        let listaTermos = $('#listaTermos').value;
       
        let arrayTermos = listaTermos.split(',');
       
        let termos = {};

        let len = arrayTermos.length;
        for (x = 1; x <= len;x++){
            termos[x] = arrayTermos[x-1].trim();            
        }//fim for

        respostaContainer = $("#respostaContainer");
        respostaContainer.innerHTML += "<br>Executando pesquisa...";

        http = new HttpService();      

        let qtdEncontrada = 0;

        http.obtemLinks(url).then( links =>{            

            pesquisaURL(url,termos, qtdEncontrada);

            links.forEach(link => {
                if(link.indexOf(url) != -1){
                   let termosEncontrados = pesquisaURL(link,termos, qtdEncontrada);

                   termosEncontrados.forEach(k =>{
                       delete termos[k];
                   })
                }//fim if
            })

        } ).catch(error => {
                console.log("Houve um"+error);    
                
            });

    }catch(Error){
        console.log("Erro."+Error);
    }

    console.log("The end!");
}//fim enviarPesquisa




function pesquisaURL(url, termos, i){

        console.log(`Pesquisando em: ${url}`);
        pesquisaJson = {"url": url, "termos": termos};

        let termosEncontrados = [];
    try{
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "https://busca-termos.herokuapp.com/pesquisa", true);

        xhr.setRequestHeader("Content-Type", "application/json");

        respostaContainer = $("#respostaContainer");
        
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == "201"){
                resposta= JSON.parse(this.responseText);
                console.log(resposta.links);
                
                let p = document.createElement('p');            

                for (c in resposta) {
                    if(resposta[c] == "Encontrado"){

                        p.innerHTML += `<p><strong>${pesquisaJson.termos[c]}</strong> 
                        Encontrado em <a href="${url}" target="_blank">${url} </a>! </p>`;
                        console.log(`Removendo ${termos[c]}`); 
                        
                        termosEncontrados.push(c);
                        
                        console.log(`Quantidade de termos: ${termos.length}`);
                        i++;
                    }
                }      
                
                respostaContainer.appendChild(p);                
              
            }//if
            
        }//xhr
        xhr.send(JSON.stringify(pesquisaJson));
        return termosEncontrados;
        
    }catch(Error){
        console.log("Erro."+Error);
    }


}


function removerTermo(termos, termo){
    let len = termos.length;

    console.log(`Removendo o termo: ${termo}`);

    for (i =0; i <len; i++){
        if(termos[i] == termo){
            termos.splice(i);
        }
    }
}

/*
function enviarPesquisa(event){
    try{
        console.log("Enviando pesquisa!");
        event.preventDefault();
        $ = document.querySelector.bind(document);

        let url = $('#basic-url').value;
        let listaTermos = $('#listaTermos').value;
       
        let arrayTermos = listaTermos.split(',');
       
        let termos = {};

        let len = arrayTermos.length;
        for (i = 1; i <= len; i++){
            termos[i] = arrayTermos[i-1].trim();            
        }//fim for
        
        console.log[termos];

        pesquisaJson = {"url": url, "termos": termos};        
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "https://busca-termos.herokuapp.com/pesquisa", true);

        xhr.setRequestHeader("Content-Type", "application/json");

        respostaContainer = $("#respostaContainer");
        respostaContainer.innerHTML += "<br>Executando pesquisa...";

        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == "201"){
                resposta= JSON.parse(this.responseText);
                console.log(resposta.links);
                //respostaContainer = $("#respostaContainer");

                

                let p = document.createElement('p');

                let i = 0;

                for (c in resposta) {
                    if(resposta[c] == "Encontrado"){
                        p.innerHTML += `<p><strong>${pesquisaJson.termos[c]}</strong> 
                        Encontrado em <a href="${url}" target="_blank">${url} </a>! </p>` 
                        i++;
                    }
                }

                let percentualSucesso = ((i/len) * 100);
                percentualSucesso = parseFloat(percentualSucesso.toFixed(2));
                
                
                resposta.links.forEach( link =>{
                    if(link.indexOf(url) != -1){
                       pesquisaURL(link,termos, i);
                    }
                });

                respostaContainer.appendChild(p);

                p.innerHTML += `<p>Foram encontrados <strong>${percentualSucesso}%</strong> dos termos</p>`;
                console.log("Sucesso!");
            }//if
        }//xhr
        xhr.send(JSON.stringify(pesquisaJson));
    }catch(Error){
        console.log("Erro."+Error);
    }
}//fim enviarPesquisa
*/