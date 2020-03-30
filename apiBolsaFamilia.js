var axios = require('axios')
var user = require('readline-sync')

function valorMedioPorBeneficiado(){
    var valor = user.questionInt('digite o valor total recebido pelo muncipio pesquisado: ')
    var beneficiados = user.questionInt('digite a quantidade de beneficiados: ')
    var resultado = valor/beneficiados

    console.log(`\n\nO municipio pesquisado recebe em media ${resultado} por beneficiado.`)
menu()
}

function consultaCodMunicipio(){
    var municipio = user.question('\ndigite o nome do municipio para obter o codigo do IBGE (se precisar de espaco use -): \n')
axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municipio}`)
    .then(resultado => {
        console.log(`esse é o id do municipio ${resultado.data.id}`)
    menu()
    })
}

function consultaBolsa(){
var mesAno = user.question('\ndigite junto o ano e o mes q vc deseja, ex: janeiro de 2020 (202001): ')
var codIBGE = user.question('digite o codigo de municipio do IBGE: ')

axios.get(`http://www.transparencia.gov.br/api-de-dados/bolsa-familia-por-municipio?mesAno=${mesAno}&codigoIbge=${codIBGE}&pagina=1`)
    .then(resultado => {
        console.log(resultado.data)
        menu()  
    })
   .catch(erro=>{
       console.log('erro ao conectar', erro)
       menu()
    })
   
}

function menu(){
    var interaçoes = user.question('\n\ndigite 1 para ver o codigo de municipio do IBGE: \n\ndigite 2 para ver os dados do bolsa familia de um municipio: \n\ndigite 3 para calcular o valor medio recebido por beneficiado: ')
if(interaçoes == 1){
    consultaCodMunicipio()
}if(interaçoes == 2){
    consultaBolsa()
}if(interaçoes == 3){
    valorMedioPorBeneficiado()
}
}

menu()
