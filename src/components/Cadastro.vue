<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4">
        <b-field>
          <b-input expanded placeholder="Qual rota deseja criar?" v-model="rota"></b-input>
        </b-field>

        <b-field>
          <b-input
            v-model="retorno"
            placeholder="Qual o retorno desejado? (JSON)"
            rows="10"
            type="textarea"
          ></b-input>
        </b-field>

        <b-button class="is-fullwidth" type="is-success" @click="criarApi()">Criar API Fake!</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Cadastro",
  data: function() {
    return {
      rota: "",
      retorno: "",
      linkCriado: ""
    };
  },
  methods: {
    criarApi: function() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      this.isLoading = true;

      axios
        .post(
          `${proxyurl}https://fake-api-back.herokuapp.com/new/${this.rota}`,
          JSON.parse(this.retorno)
        )
        .then(response => {
          if (response.status == 203) {
            this.isLoading = false;
            this.linkCriado = response.data.rota;

            this.$dialog.alert({
              title: "API Fake criada com sucesso!",
              type: "is-success",
              message: ` Sua API está pronta para uso. Acesse-a clicando  <a target='_blank' href=${
                response.data.rota
              }>neste link.</a>`,
              confirmText: "Fechar!"
            });
          }
          console.log(response);
        });
    }
  }
};
</script>

<style scoped lang="less">
.container {
}
</style>