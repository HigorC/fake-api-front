<template>
  <div class="cadastro">
    <b-form-input v-model="rota" placeholder="Qual rota deseja criar?"></b-form-input>

    <b-form-textarea
      id="textarea"
      v-model="retorno"
      placeholder="Qual o retorno desejado?"
      rows="9"
    ></b-form-textarea>

    <button class="btn btn-block btn-success btn-criar" @click="criarApi()">Criar API Fake!</button>

    <b-modal
      ref="modal-sucesso"
      id="modal-1"
      title="API Fake criada com sucesso!"
      modal-cancel="false"
    >
      <div class="conteudo-modal">
        Sua API está pronta para uso.
        Acesse-a clicando
        <a
          target="_blank"
          :href="linkCriado"
        >Aqui</a>
      </div>
    </b-modal>
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

      axios
        .post(
          `${proxyurl}https://fake-api-back.herokuapp.com/new/${this.rota}`,
          JSON.parse(this.retorno)
        )
        .then(response => {
          if (response.status == 203) {
            this.linkCriado = response.data.rota;
            this.$refs["modal-sucesso"].show();
          }
          console.log(response);
        });
    }
  }
};
</script>

<style lang="less">
.cadastro {
  padding: 30px 30%;

  #textarea,
  .btn-criar {
    margin-top: 10px;
  }
  .btn-criar {
    font-weight: bold;
  }
}
</style>