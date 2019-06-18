<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">FAKE API</h1>
          <h2 class="subtitle">Dados fakes, requisições reais</h2>
        </div>
      </div>
    </section>

    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Criar" >
        <Cadastro/>
      </b-tab-item>

      <b-tab-item label="Apenas Status">
        Lorem
        <br>ipsum
        <br>dolor
        <br>sit
        <br>amet.
      </b-tab-item>

      <b-tab-item label="Prontas">
        Lorem
        <br>ipsum
        <br>dolor
        <br>sit
        <br>amet.
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Cadastro from "./Cadastro";

export default {
  components: {
    Cadastro
  }
};
</script>

<style scoped lang="less">
.hero {
  background-color: #4529b3 !important;
  .title {
    letter-spacing: -1px;
  }
}
</style>