<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <a href=".">
            <h1 class="title">FAKE API</h1>
            <h2 class="subtitle">Dados fakes, requisições reais</h2>
          </a>
        </div>
      </div>
    </section>

    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Criar">
        <Cadastro/>
      </b-tab-item>

      <b-tab-item label="Modelos">
        <Modelos/>
      </b-tab-item>

      <b-tab-item label="Códigos de Status">
        <Status/>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Cadastro from "./Cadastro";
import Status from "./Status";
import Modelos from "./Modelos";

export default {
  components: {
    Cadastro,
    Status,
    Modelos
  }
};
</script>

<style scoped lang="less">
.hero {
  background-image: linear-gradient(to left, #6b4aec, #167df0);

  .title {
    letter-spacing: -1px;
  }
}
</style>