<template>
    <div id="app">
        <clientes :users="users" @onSacar="onSacar" @onDepositar="onDepositar" />
        <modal :form="form" :modal="modal" :msg="msg" @onFormSubmit="onFormSubmit" />
    </div>
</template>

<script>
    import axios from 'axios';
    import clientes from './components/clientes/clientes';
    import modal from './components/clientes/modal';

    export default {
        name: 'App',
        components: {
            clientes,
            modal
        },
        data() {
            return {
                url: "http://localhost:8000/api/users",  // Caminho da API
                users: [],
                form: {
                    valor: ''
                },
                modal: {
                    titleModal: '',
                    btnClass: '',
                },
                msg: '',
            };
        },
        methods: {
            getUsers() {
                axios.get(this.url).then(data => {
                    this.users = data.data;
                });
            },
            editUser(data) {
                var saldo = parseFloat(data.saldo);
                var valor = parseFloat(data.valor);
                if (data.isSacar) {
                    if (saldo >= valor) {
                        data.valor = saldo - valor;
                    } else {                        
                        this.msg = "O valor solicitado é maior do que disponível em conta";
                        return false;
                    }
                } else {
                    data.valor = saldo + valor;
                }

                axios.put(`${this.url}/${data.id}`, {
                        valor: data.valor
                    }).then(() => {
                        this.getUsers();
                    }).catch(e => {
                        console.log(e);
                    });
            },
            onSacar(data) {
                this.form = data;
                this.form.isSacar = true;
                this.modal.titleModal = 'Realizar Saque';
                this.modal.btnClass = 'btn btn-danger';
                this.msg = '';
            },
            onDepositar(data) {
                this.form = data;
                this.form.isSacar = false;
                this.modal.titleModal = 'Realizar Depósito';
                this.modal.btnClass = 'btn btn-success';
                this.msg = '';
            },
            onFormSubmit(data) {
                this.editUser(data);
            },
        },
        created() {
            this.getUsers();
        }
    };
</script>

<style>
    body {
        background: #ccc;
        text-align: center;
    } 

    #app {        
        color: #000;
        margin-top: 30px;
    }
</style>