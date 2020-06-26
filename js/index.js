function SelectOptionEstados(resposta, selectClass){
            
    const estados = JSON.parse(resposta).estados
    const valores = document.querySelector(selectClass)

    estados.forEach(estado => {
        const option = document.createElement("option")
        option.value = estado.sigla
        option.innerHTML = estado.sigla

        valores.appendChild(option)
    })

}

function SelectOptionCidades(resposta, uf){
    
    const estados = JSON.parse(resposta).estados

    const select = document.querySelector(".cidades")
    
    select.innerHTML = " "
    
    estados.forEach(estado => {

        console.log(uf, estado.sigla)

        if(estado.sigla == uf){

            estado.cidades.forEach(cidade => {
                const option = document.createElement("option")
                option.value = cidade
                option.innerHTML = cidade

                select.appendChild(option)
            })
        }
    })

}

//ajax com XMLHttpRequest
function ajax(config) {
    const xhr = new XMLHttpRequest()

    //requisção
    xhr.open(config.method, config.url, true)

    xhr.onload = e => {
        if(xhr.status === 200){
            config.sucesso(xhr.response)
        }else if(xhr.status >= 400) {
            config.error({
                code: xhr.status,
                text: xhr.statusText
            })
        }
    }

    xhr.send()
}

//objetos de requisição
let cidadeReq = {
    method: "get",
    url: "dados/dados.json",
    estado: "",
    sucesso(resposta) {
        SelectOptionCidades(resposta, this.estado)
    },
    error(e) {
        const erro = document.createTextNode(`${e.code}: ${e.text}`)
        document.querySelector("body").appendChild(erro)
    }

}

const estadosReq = {
    method: "get",
    url: "dados/dados.json",
    sucesso(resposta) {
        SelectOptionEstados(resposta, ".estados")
    },
    error(e) {
        const erro = document.createTextNode(`${e.code}: ${e.text}`)
        document.querySelector("body").appendChild(erro)
    }

}

ajax(estadosReq)

//função callback para onclick 
function atualizarCidades() {
    const estado = document.querySelector(".estados").selectedOptions[0].value

    cidadeReq.estado = estado

    console.log(estado, cidadeReq.estado)

    ajax(cidadeReq)
}

function googleMaps() {
    let estado = document.querySelector(".estados").selectedOptions[0].value
    let cidade = document.querySelector(".cidades").selectedOptions[0].value

    let url = `https://www.google.com/maps/place/${cidade},+${estado}`
    
    document.querySelector("a").href = url
}