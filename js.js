

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
}
let bd = new Bd() //fazerndo a instancia da *class Bd* que agora é *bd*



