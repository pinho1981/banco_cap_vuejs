<template>
    <div class="container">      
        <h1>BANCO CAPGEMINI</h1>

         <table class="table table-striped topo">
            <thead>
                <tr>
                    <th class="cls_nome" scope="col">Nome do Cliente</th>
                    <th class="cls_agencia" scope="col">Agência</th>
                    <th class="cls_conta" scope="col">Conta Corrente</th>
                    <th class="cls_saldo" scope="col">Saldo</th>
                    <th class="cls_transacoes" scope="col">Transações</th>
                </tr>
            </thead>
        </table>

        <div class="wrap-table">
            <div class="table">
                <list v-for="user in users" :key="user.id" :user="user" @onSacar="onSacar" @onDepositar="onDepositar" />
            </div>
        </div>
    </div>
</template>

<script>
    import List from "./listagem";

    export default {
        name: 'clientes',
        components: {
            List
        },
        props: {
            users: {
                type: Array
            }
        },
        methods: {
            onSacar(data) {
                this.$emit("onSacar", data);
            },
            onDepositar(data) {
                this.$emit("onDepositar", data);
            }
        }
    };
</script>

<style>
    .table  {
        border: none !important;;
        margin: 0 !important;
    }

    .topo {
        border: none;
        background: #aaa;
    }

    .cls_nome {
        width: 250px !important;
    }

    .cls_agencia {
        width: 80px !important;
    }

    .cls_conta {
        width: 120px !important;
    }

    .cls_saldo {
        width: 70px !important;
    }

    .cls_transacoes {
        width: 300px !important;
    }       
</style>