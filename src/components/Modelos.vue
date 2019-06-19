<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4">
        <b-field label="Selecione um modelo">
          <b-select expanded placeholder="Selecione" v-model="info.tipo">
            <option v-for="modelo in modelos" :value="modelo.id" :key="modelo.id">{{ modelo.tipo}}</option>
          </b-select>
        </b-field>

        <b-field label="Quantidade">
          <b-numberinput v-model="info.quantidade" min="1"></b-numberinput>
        </b-field>

        <b-button class="is-fullwidth" type="is-success" @click="criarApi()">Criar API Fake!</b-button>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      modelos: [],
      info: {
        tipo: undefined,
        quantidade: 1
      }
    };
  },
  created: function() {
    this.isLoading = true;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(`${proxyurl}https://fake-api-back.herokuapp.com/api/modelos`)
      .then(response => {
        this.isLoading = false;
        this.modelos = response.data;
      });
  },
  methods: {
    criarApi: function() {
      this.$dialog.alert({
        title: "API Fake criada com sucesso!",
        type: "is-success",
        message: ` Sua API está pronta para uso. Acesse-a clicando  <a target='_blank' href=https://fake-api-back.herokuapp.com/api/models/${
          this.info.tipo
        }?size=${this.info.quantidade}>neste link.</a>`,
        confirmText: "Fechar!"
      });
    }
  }
};
</script>

<style>
</style>
