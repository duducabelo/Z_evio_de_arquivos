

class Dados{ // usando o metudo construtor criar um ojbeto literau no qual eu posso tratar
	constructor(ano, mes, dia, tipoarq, descri, idarq, arquivo)
	{this.ano = ano, this.mes = mes, this.dia = dia, this.tipoarq = tipoarq, this.descri = descri, this.idarq = idarq, this.arquivo = arquivo}

	campoVasil(){ // verifica sao de campo vasil 
		for (let i in this) {
			if (this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

function enviar(){ //esta funçao tem o objetivo de, atraves od *id* dos elementos da pagina index, trazelos para uma tratativa varialeu

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipoarq = document.getElementById('tipoarq')
	let descri = document.getElementById('descri')
	let idarq = document.getElementById('idarq')
	let arquivo = document.getElementById('arquivo')
	//criando a variavel *dados* onde o construtor vai me trazer o objeto pronto para ser tratado, agora *Dados* que ven do contrutor* passao a ser a variavel *dados*  
	let dados = new Dados(ano.value, mes.value, dia.value, tipoarq.value, descri.value, idarq.value, arquivo.value)

	if (dados.campoVasil()) { //if para dar um alerta de prenchimento do campos
		
		bd.gravar(dados) // aqui com a intancia *bd* que faz a gravaçao e a inclusao de ID nos dados inseridos em localStorage do navegador
				  
		document.getElementById('Titulo_modal_div').className ='modal-header badge-primary'
		document.getElementById('Titulo').innerHTML = 'Dados gravados com susseso!'
		document.getElementById('conteudo').innerHTML = 'Enviado com sucesso OK !'
		document.getElementById('btn').className ='modal-header badge-primary'
		document.getElementById('btn').innerHTML = 'OK'
		$('#campos_vasilos').modal('show')
	}else{
		
		document.getElementById('Titulo_modal_div').className ='modal-header badge-danger'
		document.getElementById('Titulo').innerHTML = 'Erro de campo vasil'
		document.getElementById('conteudo').innerHTML = 'Para dar certo, todos os campos devem ser prenchidos OK !'
		document.getElementById('btn').className ='modal-header badge-danger'
		document.getElementById('btn').innerHTML = 'Voltar e verificar'
		$('#campos_vasilos').modal('show')
	}
}

			//gravar(dados) // aqui eu começo a chiar a funçao de gravaçao *gravar* "tenho que ver como irei fazer para gravar no banco de dados pois nao sei"

			// function gravar(d) { // criando uma funçao onde chamo o gravar e *gravar vai receber um novo parametro a letra *d*
			// 	localStorage.setItem('dados', JSON.stringify(d)) //localStorage.setItem e um local do proprio navegador, entao aqui o meu objeto literal agora que é *d* para a ser uma string "texto"  ataves do metudo JSON 
			// }

////////// 'construtor gera ID = 0', 'oproximoId() faz incremento de +1 ID' e 'gravar(d) faz o processo de gravaçao'//////////

class Bd{ // a *class Bd* representa o banco de dados que é o objeto que sera localStorage do proprio navegador "pais eu nao sei usar o banco de dados" 
	
	constructor(){
		let id =localStorage.getItem('id')
		
		if (id === null) {
			localStorage.setItem('id', 0) //porra de novo *setItem* nao -getItem- / set "inseter inserir id  para 0"
		}
	}

	oproximoId()	{
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1 // porra presta atençao con o *int* nao é -iten- eu te entendo , os vizinhos são um bando de filhos da puta que só sabem bater na parede e fasez barulho, FILHOS DA PUTA, EU VOU MATALOS A SIM QUE POSSÍVEL. para tudo tem a hora certa ok voolte para o projeto blz fuma um cigarro ok
	}
	
	gravar(d) { // *gravar vai receber um novo parametro a letra *d* 
		let id = this.oproximoId()

		localStorage.setItem(id, JSON.stringify(d)) //localStorage.setItem e um local do proprio navegador, entao aqui o meu objeto literal agora que é *d* para a ser uma string "texto"  ataves do metudo JSON 
		
		localStorage.setItem('id', id)
		
		}
		
	recuperarListaDados(){ //faz parte da pa consulta.html
		
		let listaDados = Array() ///aplicando um Array para cada indice 
		
		let id = localStorage.getItem('id') ///pegando o 'id de localStorage que é uma string devido a JSON.String' e com a variadel *id* trago a string para objeto literal

		for (let i = 1; i <= id; i++) { ///estrutura de loop que me trases o indice dos abjetos que ainda estao como string 

			let listaDado = JSON.parse(localStorage.getItem(i)) ///tasendo o indice agora como objeto literal ,,JSON.parse()

			if (listaDado == null) { /// pulaar o array que estiver vsil
					continue
			}

			listaDados.push( listaDado) /// con o metudo push para coloca dento do Array "push pega o objeto e insere no Array"
		}		
		return listaDados
	}

	consultar(lista){
		
		let filtro = Array() //criardo uma variavel e atribuindo um array que vai reseber os dados vindo de recuperarListaDados()
		filtro = this.recuperarListaDados() //filtra recebe os dados de recuperarListaDados()

		if(lista.ano != ''){
		filtro = filtro.filter(d => d.ano == lista.ano) //no metito de call muita atensao
		}
		if(lista.mes != ''){
		filtro = filtro.filter(d => d.mes == lista.mes)
		}
		if(lista.dia != ''){
		filtro = filtro.filter(d => d.dia == lista.dia)
		}
		if(lista.tipoarq != ''){
		filtro = filtro.filter(d => d.tipoarq == lista.tipoarq)
		}
		if(lista.descri != ''){
		filtro = filtro.filter(d => d.descri == lista.descri)
		}
		if(lista.arquivo != ''){
		filtro = filtro.filter(d => d.arquivo == lista.arquivo)
		}
		return filtro
	 }	
}
let bd = new Bd() //fazerndo a instancia da *class Bd* que agora é *bd*

////////////estraindo dados de localStorag do proprio navegador e indo para pg cunsulta////////////////////

function carregaListaDados(){  ///carregaListaDasos() esta no body de consulta.html onload "onload chame o script para ser executado"
	
	let listaDados = Array() ///variavel que da um Array a listaDados agora um Array ja tratados "sem indice vasil null"
	
	listaDados = bd.recuperarListaDados() 
	bd.recuperarListaDados() ///chamando a variavel *bd* com o operador *.* e criaro metudo "recuperarListaDados()" dentro da  class, do objeto *Bd*, e *Bd*  foi *bd* intanciado no escopo global  
	//console.log(listaDados)
	
	let listandoTodosDados = document.getElementById('listandoTodosDados') //aqui eu estou trazeno o id de tbody em pg consulta
	
	listaDados.forEach(function(d) {
	//console.log(d)

	let linha = listandoTodosDados.insertRow()

		linha.insertCell(0).innerHTML = d.idarq
		linha.insertCell(1).innerHTML = d.ano
		linha.insertCell(2).innerHTML = d.mes
		linha.insertCell(3).innerHTML = d.dia
		linha.insertCell(4).innerHTML = d.tipoarq
		linha.insertCell(5).innerHTML = d.descri
		linha.insertCell(6).innerHTML = d.arquivo
	 })
}

function pesquisarArquivos(){
	
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipoarq = document.getElementById('tipoarq').value
	let descri = document.getElementById('descri').value
	let idarq = document.getElementById('idarq').value
	let arquivo = document.getElementById('arquivo').value
	//criando a variavel *dados* onde o construtor vai me trazer o objeto pronto para ser tratado, agora *Dados* que ven do contrutor* passao a ser a variavel *dados*  
	let dados = new Dados(ano, mes, dia, tipoarq, descri, idarq, arquivo)
	
	let filtros = bd.consultar(dados)

	
	
	listandoTodosDados.innerHTML =''

	filtros.forEach(function(d) {
	//console.log(d)

	let linha = listandoTodosDados.insertRow()

		linha.insertCell(0).innerHTML = d.idarq
		linha.insertCell(1).innerHTML = d.ano
		linha.insertCell(2).innerHTML = d.mes
		linha.insertCell(3).innerHTML = d.dia
		linha.insertCell(4).innerHTML = d.tipoarq
		linha.insertCell(5).innerHTML = d.descri
		linha.insertCell(6).innerHTML = d.arquivo
	 })
}