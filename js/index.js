
function enviarPesquisa(event){
    $ = document.querySelector.bind(document);
    statusDiv = $("#status");
    encontradosContainer = $("#encontradosContainer");
    encontradosContainer.innerHTML = "";
    statusDiv.setAttribute("class", "alert");
    try{
        
        event.preventDefault();
        

        let url = $('#basic-url').value;

        if( !url.startsWith('http://') && !url.startsWith('https://')){
            throw new Error("A URL deve iniciar com 'http://' ou 'https://'!");
        }

        let encontrados = [];

        

        let listaTermos = $('#listaTermos').value;      
        
        let arrayTermos = listaTermos.split(',');

        let termos = {};

        let len = arrayTermos.length;

        if(len > 100){
            throw new Error("Não é possível pesquisar mais de 100 termos.")
        }//fim if


        for (x = 1; x <= len;x++){
            termos[x] = arrayTermos[x-1].trim();            
        }//fim for

        respostaContainer = $("#respostaContainer");
        
        statusDiv = $("#status");


        statusDiv.innerHTML ="Enviando pesquisa, aguarde...";

        respostaContainer.innerHTML = "";

        http = new HttpService();      

        let contagem = 0;

        http.obtemLinks(url).then( links => {
            
            new Promise( (resolve, reject) =>{
           
            links.unshift(url);                     
            
            let qtdLinks = links.length;
            let qtdLinksPesquisados = 0;

            statusDiv.classList.add( "alert");
            statusDiv.classList.add("alert-primary");

            statusDiv.setAttribute("role", "alert");

            links.forEach(link => {                    

                    console.log(`Pesquisando em: ${link}`);
                        
                        http.post(link, termos)
                            .then( resposta => {
                                qtdLinksPesquisados++;
                                let p = document.createElement('p');            
                                
                                for (c in resposta) {
                                    if((resposta[c]['status'] == "Encontrado") ){

                                        p.innerHTML += `<p><strong>${arrayTermos[c-1]}</strong> 
                                        Encontrado em <a href="${link}" target="_blank">${link} </a>! </p>
                                        <strong>Trecho:</strong>${resposta[c]['snippet']} <br/><hr/>`;
                                        console.log(`Removendo ${termos[c]}`);   

                                        if(termos[c])
                                            encontrados.push(termos[c]);                                     
                                        
                                        delete termos[c];
                                        console.log(`Quantidade de termos: ${(++contagem)}`);
                                        
                                    }//fim if
                                }//fim for     
                                
                                respostaContainer.appendChild(p); 
                                return qtdLinksPesquisados;
                            }//fim then

                        ).then( qtdLinksPesquisados => {
                            
                        let percentDone = (qtdLinksPesquisados/qtdLinks) * 100;
                        console.log(`Links pesquisados: ${qtdLinksPesquisados}, total de links: ${qtdLinks}`);
                        statusDiv.innerHTML = `Processando: ${parseFloat(percentDone.toFixed(2))}% Concluído.`;

                        if(percentDone == 100){
                            let size = Object.keys(termos).length;
                            console.log(`Tamanho termos{}: ${size}`);
                            percent = ( (len - size) / len ) * 100;
                            statusDiv.innerHTML += `<br> Foram encontrados ${parseFloat(percent.toFixed(2))}% dos termos.`;

                            statusDiv.classList.remove("alert-primary");
                            statusDiv.classList.add("alert-success");

                            let h2 = document.createElement("h2");

                            h2.innerHTML = "Termos encontrados:";
                            
                            encontradosContainer.classList.add("alert");
                            encontradosContainer.classList.add("alert-secondary");
                            encontradosContainer.setAttribute("role","alert");

                            encontradosContainer.appendChild(h2);
                            let ol = document.createElement("ol");
                            encontradosContainer.appendChild(ol);
                            encontrados.forEach(item => {
                                let li = document.createElement("li");
                                li.innerHTML = item;
                                ol.appendChild(li);
                                
                            });


                        }//fim if

                        return qtdLinksPesquisados;
                    }).catch( error => {
                        qtdLinksPesquisados++;
                        console.log("Erro."+error);
                        let p = document.createElement('p');
                        p.setAttribute("class", "alert");
                        p.setAttribute("role", "alert");
                        p.classList.add("alert-danger");
                        p.innerHTML = error; 
                        respostaContainer.appendChild(p);
                        return;
                    }

                    );
                    })//fim forEach
                
            });     
        
    }).catch(error => {
                console.log("Erro."+error);
                statusDiv.setAttribute("class", "alert");
                statusDiv.classList.add("alert-danger");
                statusDiv.innerHTML = error;   
                
            });

    }catch(error){
        console.log("Erro."+error);
        statusDiv.setAttribute("class", "alert");
        statusDiv.classList.add("alert-danger");
        statusDiv.innerHTML = error.message;
    }

    console.log("The end!");
}//fim enviarPesquisa




/*function pesquisaURL(url, termos, i){

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


}*/


/*function removerTermo(termos, termo){
    let len = termos.length;

    console.log(`Removendo o termo: ${termo}`);

    for (i =0; i <len; i++){
        if(termos[i] == termo){
            termos.splice(i);
        }
    }
}
*/
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