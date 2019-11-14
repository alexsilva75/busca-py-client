
function enviarPesquisa(event){
    try{
        console.log("Enviando pesquisa!");
        event.preventDefault();
        $ = document.querySelector.bind(document);

        let url = $('#basic-url').value;
        let listaTermos = $('#listaTermos').value;

        console.log(listaTermos);

        let arrayTermos = listaTermos.split(',');
        console.log(arrayTermos);
        //arrayTermos = arrayTermos.isArray()? arrayTermos : [listaTermos,];

        let termos = {};

        let len = arrayTermos.length;
        for (i = 1; i <= len; i++){
            termos[i] = arrayTermos[i-1].trim();
            console.log(termos[i]);
        }
        
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
                p.innerHTML += `<p>Foram encontrados <strong>${percentualSucesso}%</strong> dos termos</p>`;
                
                resposta.links.forEach( link =>{
                    if(link.indexOf(url) != -1){
                        pesquisaURL(link,arrayTermos);
                    }
                });

                respostaContainer.appendChild(p);
                console.log("Sucesso!");
            }//if
        }//xhr
        xhr.send(JSON.stringify(pesquisaJson));
    }catch(Error){
        console.log("Erro."+Error);
    }
}//


function enviarPesquisa2(event){
    console.log("Enviando pesquisa!");
    event.preventDefault();
    $ = document.querySelector.bind(document);

    let url = $('#basic-url').value;
    let listaTermos = $('#listaTermos').value;

    console.log(listaTermos);

    let arrayTermos = listaTermos.split(',');

    resposta = pesquisaURL(url,arrayTermos);

    


}

function pesquisaURL(url, arrayTermos){
    let termos = {};

        let len = arrayTermos.length;
        for (i = 1; i <= len; i++){
            termos[i] = arrayTermos[i-1].trim();
            console.log(termos[i]);
        }
        
        console.log[termos];

        pesquisaJson = {"url": url, "termos": termos};

        
    try{
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
                p.innerHTML += `<p>Foram encontrados <strong>${percentualSucesso}%</strong> dos termos</p>`;
                
                respostaContainer.appendChild(p);
                console.log("Sucesso!");
            }//if
            
        }//xhr
        xhr.send(JSON.stringify(pesquisaJson));

        
    }catch(Error){
        console.log("Erro."+Error);
    }


}