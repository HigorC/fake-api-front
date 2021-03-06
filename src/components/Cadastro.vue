<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <b-field label="Rota">
          <b-input expanded placeholder="exemplo-pessoa" v-model="rota"></b-input>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column is-3 is-offset-4">
        <b-field label="Quantidade">
          <b-numberinput controls-position="compact" v-model="quantity" min="1"></b-numberinput>
        </b-field>
      </div>
      <div class="column is-2">
        <b-field label="Gerar ID">
          <b-switch v-model="gerarId"  type="is-success"></b-switch>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div id="editor"></div>

        <b-tooltip
          class="tooltip"
          label="Insira um JSON válido"
          position="is-bottom"
          :active="!isJsonValido"
          animated
        >
          <b-button
            :disabled="!isJsonValido"
            class="is-fullwidth"
            type="is-success"
            @click="criarApi()"
          >Criar API Fake!</b-button>
        </b-tooltip>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import axios from "axios";

import ace from "ace-builds";

import "ace-builds/webpack-resolver";

export default {
  name: "Cadastro",
  data: function() {
    return {
      rota: "",
      retorno: "",
      linkCriado: "",
      isLoading: false,
      editor: null,
      isJsonValido: false,
      gerarId: false
    };
  },
  created: function() {},
  mounted: function() {
    this.editor = ace.edit("editor");

    this.editor.session.setMode("ace/mode/javascript");

    this.editor.session.on("change", delta => {
      this.validateJson(this.editor.getValue());
    });
  },
  methods: {
    validateJson(str) {
      try {
        var json = JSON.parse(str);
        this.isJsonValido = typeof json === "object";
      } catch (e) {
        this.isJsonValido = false;
      }
    },
    criarApi: function() {
      this.retorno = this.editor.getValue();

      if (
        !this.rota ||
        this.rota.trim() == "" ||
        !this.retorno ||
        this.retorno.trim() == ""
      ) {
        this.$toast.open({
          duration: 3000,
          message: `Informe valores válidos para criar sua API`,
          position: "is-top-right",
          type: "is-danger"
        });
        return;
      } else if (!/\w/.test(this.rota)) {
        this.$toast.open({
          duration: 3000,
          message: `A rota não pode conter simbolos como: ?, / e & `,
          position: "is-top-right",
          type: "is-danger"
        });
        return;
      }

      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      this.isLoading = true;

      try {
        axios
          .post(
            `${proxyurl}https://fake-api-back.herokuapp.com/new/${this.rota}?quantity=${this.quantity}&generateid=${this.gerarId}`,
            JSON.parse(this.retorno)
          )
          .then(response => {
            if (response.status == 203) {
              this.isLoading = false;
              this.linkCriado = response.data.rota;

              this.$dialog.alert({
                title: "API Fake criada com sucesso!",
                type: "is-success",
                message: ` Sua API está pronta para uso. Acesse-a clicando  <a target='_blank' href=${response.data.rota}>neste link.</a>`,
                confirmText: "Fechar!"
              });
            }
          })
          .catch(err => {
            this.$toast.open({
              duration: 3000,
              message: err,
              position: "is-top-right",
              type: "is-danger"
            });
            this.isLoading = false;
          });
      } catch (e) {
        this.$toast.open({
          duration: 3000,
          message: e,
          position: "is-top-right",
          type: "is-danger"
        });
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.tooltip {
  display: inherit;
}

#editor {
  width: 100%;
  height: 200px;

  border: 1px solid #ccc;
  margin-bottom: 20px;
}
</style>