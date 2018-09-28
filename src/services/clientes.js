import { http } from './config'

export default {
    listar:() => {
        return http.get('listar-clientes')
    },

    pesquisar:(id) => {
        return http.get('pesquisar-cliente?id=' + id)
    },

    salvar:(cliente) => {
        return http.post('cadastrar-cliente', cliente)
    },

    atualizar:(cliente) => {
        return http.put('editar-cliente', cliente)
    },

    apagar:(id) => {
        return http.delete('delete-cliente?id=' + id)
    }
}