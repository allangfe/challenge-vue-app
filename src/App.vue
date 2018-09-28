<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Clientes</a>
      </div>
    </nav>

    <div class="container">

      <p style="color:red"><b>{{mensagemErro}}</b></p>
      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="cliente.nome">
          <label>Sobrenome</label>
          <input type="text" placeholder="Sobrenome" v-model="cliente.sobrenome">
          <label>Cpf</label>
          <input type="text" placeholder="Cpf" v-model="cliente.cpf">
          <label>Data de Nascimento</label>
          <input type="date" placeholder="Data de Nascimento" v-model="cliente.dataNascimento">
          <label>Profissão</label>
          <select style="display:inline"  v-model="cliente.profissao">
            <option value="null"></option>
            <option value="1">Programador</option>
            <option value="2">Analista</option>
            <option value="3">Gerente</option>
            <option value="4">Estagiário</option>
            <option value="5">QA</option>
          </select>
          <br/>
          <br/>
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>SOBRENOME</th>
            <th>CPF</th>
            <th>DATA DE NASCIMENTO</th>
            <th>IDADE</th>
            <th></th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="cliente in clientes" :key="cliente.Id">
            <td>{{cliente.Nome}}</td>
            <td>{{cliente.Sobrenome}}</td>
            <td>{{cliente.Cpf}}</td>
            <td>{{formatarData(cliente.DataNascimento)}}</td>
            <td>{{cliente.Idade}}</td>
            <td>
              <button @click="pesquisar(cliente.Id)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(cliente.Id)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Cliente from './services/clientes'
import Moment from 'moment'

export default {

  data(){
    return {
      cliente: {
        codCliente: 0,
        nome: '',
        sobrenome: '',
        cpf: '',
        dataNascimento: new Date(),
        profissao: null
      },


      clientes: [],
      mensagemErro: ''
    }
  },

  mounted(){
   this.listar()
  },

  methods:{
    listar(){
       Cliente.listar().then(resposta => {
        this.clientes = resposta.data.Valor
      })
    },

    pesquisar(id){
      Cliente.pesquisar(id).then(resposta => {
        this.cliente = {
          codCliente: resposta.data.Valor.Id,
          nome: resposta.data.Valor.Nome,
          sobrenome: resposta.data.Valor.Sobrenome,
          cpf: resposta.data.Valor.Cpf,
          dataNascimento: Moment(resposta.data.Valor.DataNascimento).format('YYYY-MM-DD'),
          profissao: resposta.data.Valor.Profissao
        }
      }).catch(e =>{
        this.mensagemErro = e.resposta.data.Mensagem
      })
    },

    salvar(){
      if(!this.cliente.codCliente){
        Cliente.salvar(this.cliente).then(resposta => {
            this.cliente = {}

            alert('Salvo com sucesso.')

            this.listar()

            this.mensagemErro = ''
          }).catch(e => {
            this.mensagemErro = e.response.data.Mensagem
          })
      }else{
        console
        Cliente.atualizar(this.cliente).then(resposta => {
            this.cliente = {}

            alert('Atualizado com sucesso.')

            this.listar()

            this.mensagemErro = ''
          }).catch(e => {
            this.mensagemErro = e.response.data.Mensagem
          })   
      }
    },

    remover(id){
      if(confirm('Deseja excluir o cliente ?')){
        Cliente.apagar(id).then(resposta => {
          this.listar();
          this.mensagemErro
        }).catch(e => {
          this.mensagemErro = e.response.data.Mensagem
        }) 
      }
    },

    formatarData(data){
      return Moment(data).format('DD/MM/YYYY')
    }
  }
}

</script>
