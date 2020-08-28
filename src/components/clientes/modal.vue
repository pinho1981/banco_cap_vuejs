<template>
	<div
		class="modal fade"
		id="exampleModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
		data-backdrop="static" 
		data-keyboard="false"
	>
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">{{ modal.titleModal }}</h5>

					<button
						type="button"
						class="close text-danger"
						data-dismiss="modal"
						aria-label="Close"
						@click="onFormClose"
					>
						<span aria-hidden="true">x</span>
					</button>
				</div>

				<form>
					<div class="modal-header">
						<div v-if="modal.titleModal == 'Realizar Depósito'">Qual quantia deseja depositar?</div>
						<div v-else>Qual quantia deseja sacar?</div>
					</div>

					<div class="modal-body">
						<input
							type="number"
							id="valor"
							name="valor"
							class="form-control"
							@change="handleChanger"
							:value="form.valor"
						/>
					</div>

					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-dismiss="modal"
							@click="onFormClose"
						>
							Fechar
						</button>

						<button
							type="button"
							:class="modal.btnClass"
							@click="onFormSubmit"
						>
							{{ modal.titleModal }}
						</button>

						<div v-if="error_msg" class="mensagem text-danger border border-danger">{{ error_msg }}</div>
					</div>
				</form>
			</div>
    	</div>
  	</div>
</template>

<script>
export default {
  	name: "modal",
  	props: {
    	modal: Object,
    	form: Object,
    	msg: String,
  	},
  	data() {
    	return {
      		error_msg: "",
    	};
  	},
  	watch: {
	    msg: function (val) {
      		this.error_msg = val;
    	},
  	},
  	methods: {
    	handleChanger(event) {
      		const { name, value } = event.target;
      		let form = this.form;
      		form[name] = value;
      		this.form = form;
    	},
		onFormSubmit(e) {
			e.preventDefault();

			if (this.formValidation()) {
				this.$emit("onFormSubmit", this.form);
				document.querySelector(".close").click();
				this.clearFormFields();
			}
		},
		onFormClose() {
			this.error_msg = "";
			this.clearFormFields();
		},
		formValidation() {
			if (this.form.isSacar) {
				if (document.getElementsByName("valor")[0].value === "") {
					this.error_msg = "É necessário digitar um valor para sacar.";
					return false;
				} else if (document.getElementsByName("valor")[0].value > this.form.saldo) {
					this.error_msg = "Valor digitado é superior ao saldo em conta.";
					return false;
				}
			} else {
				if (document.getElementsByName("valor")[0].value === "") {
					this.error_msg = "É necessário digitar um valor para depositar.";
					return false;
				} 
			}

			if (document.getElementsByName("valor")[0].value < 0) {
				this.error_msg = "Não é permitido digitar valores negativos.";
				return false;
			}

			return true;
		},
		clearFormFields() {
			this.form.valor = "";
			document.getElementsByName("valor")[0].value = '';
		},
  	},
};
</script>

<style>
.mensagem {
  width: 100%;
  display: block;
  margin-top: 7px;
}

.modal-content {
  position: absolute !important;
  left: -20% !important;
  width: 150% !important;
}
</style>