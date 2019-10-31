
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
        respostaContainer.innerHTML = "Executando pesquisa...";

        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == "201"){
                resposta= JSON.parse(this.responseText);
                //respostaContainer = $("#respostaContainer");
                let p = document.createElement('p');

                let i = 0;

                for (c in resposta) {
                    if(resposta[c] == "Encontrado"){
                        p.innerHTML += `${pesquisaJson.termos[c]} Encontrado! <br>`
                        i++;
                    }
                }

                let percentualSucesso = ((i/len) * 100);
                percentualSucesso = parseFloat(percentualSucesso.toFixed(2));
                p.innerHTML += `Foram encontrados ${percentualSucesso}% dos termos`;
                
                respostaContainer.appendChild(p);
                console.log("Sucesso!");
            }//if
        }//xhr
        xhr.send(JSON.stringify(pesquisaJson));
    }catch(Error){
        console.log("Erro."+Error);
    }
}//