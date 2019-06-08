<template>
  <div class="cadastro">
    <b-form-input v-model="rota" placeholder="Qual rota deseja criar?"></b-form-input>

    <b-form-textarea
      id="textarea"
      v-model="retorno"
      placeholder="Qual o retorno desejado?"
      rows="9"
    ></b-form-textarea>

    <button class="btn btn-block btn-success btn-criar">Criar API Fake!</button>
  </div>
</template>

<script>
export default {
  name: "Cadastro",
  data: function() {
    return {
      rota: "",
      retorno: ""
    };
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