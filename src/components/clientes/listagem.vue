<template>
    <tr class="linha">
        <td hidden class="cell" data-title="ID">{{ user.id }}</td>

        <td class="cls_nome_int" data-title="Nome do Cliente"> {{ user.nome }}</td>

        <td class="cls_agencia_int" data-title="Agência">{{ user.agencia }}</td>

        <td class="cls_conta_int" data-title="Conta Corrente">{{ user.conta }}</td>

        <td class="cls_saldo_int" data-title="Saldo">{{ user.saldo.replace(".", ",") }}</td>

        <td class="cls_transacoes_int" data-title="Transações">
            <button
                type="button"
                class="btn btn-danger mx-2 btn_novo"
                data-toggle="modal"
                data-target="#exampleModal"
                @click="onSacar"
            >
                Realizar Saque
            </button>

            <button
                type="button"
                class="btn btn-success mx-2 btn_novo"
                data-toggle="modal"
                data-target="#exampleModal"
                @click="onDepositar"
            >
                Realizar Depósito
            </button>
        </td>
    </tr>
</template>

<script>
    export default {
        name: 'print',
        props: {
            user: {
                type: Object
            }
        },
        methods: {
            onSacar() {
                this.$emit("onSacar", this.user);
            },
            onDepositar() {
                this.$emit("onDepositar", this.user);
            }
        }
    };
</script>
 
<style>
    .linha:hover {
        background: #999;
        cursor: text;
    }
    .celula {
        padding: 20px !important;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    .cls_nome_int {
        width: 335px !important;
    }

    .cls_agencia_int {
        width: 115px !important;
    }

    .cls_conta_int {
        width: 160px !important;
    }

    .cls_saldo_int {
        width: 70px !important;
    }

    .cls_transacoes_int {
        width: 402px !important;
    }

    .btn_novo {
        font-size: 13px;
    }
</style>