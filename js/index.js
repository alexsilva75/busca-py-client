
function enviarPesquisa(event){
    try{
        console.log("Enviando pesquisa!");
        event.preventDefault();
        $ = document.querySelector.bind(document);

        let url = $('#basic-url').value;

        console.log(url);
        pesquisaJson = {"url": url, "termos": {"1":"Catu", "2": "Alagoinhas", "3": "Guanambi"}};

        
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "https://busca-termos.herokuapp.com/pesquisa", true);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == "201"){
                resposta= JSON.parse(this.responseText);
                respostaContainer = $("#respostaContainer");
                let p = document.createElement('p');

                let i = 0;

                for (c in resposta) {
                    if(resposta[c] == "Encontrado"){
                        i++;
                    }
                }

                p.innerHTML = `Foram encontrados ${((i/3) * 100)}% dos termos`;
                
                respostaContainer.appendChild(p);
                console.log("Sucesso!");
            }//if
        }//xhr
        xhr.send(JSON.stringify(pesquisaJson));
    }catch(Error){
        console.log("Erro."+Error);
    }
}//