

class Dados{ // usando o metudo construtor criar um ojbeto literau no qual eu posso tratar
	constructor(ano, mes, dia, tipoarq, descri,  arquivo)
	{this.ano = ano, this.mes = mes, this.dia = dia, this.tipoarq = tipoarq, this.descri = descri,  this.arquivo = arquivo}

	campoVasil(){ // verifica sao de campo vasil 
		for (let i in this) {
			if (this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}
function enviar(){ 
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipoarq = document.getElementById('tipoarq')
	let descri = document.getElementById('descri')
	let arquivo = document.getElementById('arquivo')
	let dados = new Dados(ano.value, mes.value, dia.value, tipoarq.value, descri.value,  arquivo.value)
	if (dados.campoVasil()) { 
		bd.gravar(dados)
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
class Bd{ 
	constructor(){
		let id =localStorage.getItem('id')
		if (id === null) {
			localStorage.setItem('id', 0) 
		}
	}
	oproximoId()	{
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1 
	}
	gravar(d) { 
		let id = this.oproximoId()
		localStorage.setItem(id, JSON.stringify(d)) 
		localStorage.setItem('id', id)
		}
	recuperarListaDados(){
		let listaDados = Array() 
		let id = localStorage.getItem('id') 
		for (let i = 1; i <= id; i++) { 
			let listaDado = JSON.parse(localStorage.getItem(i)) 
			if (listaDado == null) { 
					continue
			}
			listaDado.id = i
			listaDados.push( listaDado) 
		}		
		return listaDados
	}
	consultar(lista){
		let filtro = Array()
		filtro = this.recuperarListaDados() 
		if(lista.ano != ''){
		filtro = filtro.filter(d => d.ano == lista.ano) //no metito de call muita atençao
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
	 excluir(id){
	 	localStorage.removeItem(id)
	 }
}
let bd = new Bd() 
function carregaListaDados(){ 
	let listaDados = Array() 
	listaDados = bd.recuperarListaDados() 
	bd.recuperarListaDados()
	let listandoTodosDados = document.getElementById('listandoTodosDados') 
	listaDados.forEach(function(d) {
	let linha = listandoTodosDados.insertRow()
		linha.insertCell(0).innerHTML = d.id
		linha.insertCell(1).innerHTML = d.ano
		linha.insertCell(2).innerHTML = d.mes
		linha.insertCell(3).innerHTML = d.dia
		linha.insertCell(4).innerHTML = d.tipoarq
		linha.insertCell(5).innerHTML = d.descri
		linha.insertCell(6).innerHTML = d.arquivo
		let remover = document.createElement("buttom") 
		remover.className = 'btn btn-danger' 
		remover.innerHTML = '<i class="far fa-trash-alt"></i>'
		remover.id = d.id
		remover.onclick = function(){
			bd.excluir(this.id)
			window.location.reload()
		}
		linha.insertCell(7).append(remover)
	 })
}
function pesquisarArquivos(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipoarq = document.getElementById('tipoarq').value
	let descri = document.getElementById('descri').value
	let arquivo = document.getElementById('arquivo').value
	let dados = new Dados(ano, mes, dia, tipoarq, descri, arquivo)
	let filtros = bd.consultar(dados)
	listandoTodosDados.innerHTML =''
	filtros.forEach(function(d) {
	let linha = listandoTodosDados.insertRow()
		linha.insertCell(0).innerHTML = d.id
		linha.insertCell(1).innerHTML = d.ano
		linha.insertCell(2).innerHTML = d.mes
		linha.insertCell(3).innerHTML = d.dia
		linha.insertCell(4).innerHTML = d.tipoarq
		linha.insertCell(5).innerHTML = d.descri
		linha.insertCell(6).innerHTML = d.arquivo
	 })
}