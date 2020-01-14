<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-6">
        <b-input
          v-model="pesquisa"
          placeholder="Busque por um status..."
          type="search"
          icon="magnify"
        ></b-input>
        <hr>
        <b-field label="Delay na resposta (em segundos)">
          <b-numberinput v-model="delay" min="0"></b-numberinput>
        </b-field>
        <hr>
        <div class="all-status">
          <a
            target="_blank"
            v-for="status in statusCodes"
            v-show="isStatusOnSearch(status)"
            :href="'https://fake-api-back.herokuapp.com/api/juststatus?status=' + status + '&requesttime=' + (delay * 1000)"
          >
            <b-tag class="status" :type="definirCorStatus(status)" size="is-medium">{{status}}</b-tag>
          </a>
        </div>
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
      statusCodes: [],
      delay: 0,
      pesquisa: ""
    };
  },
  created: function() {
    this.isLoading = true;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(
        `${proxyurl}https://fake-api-back.herokuapp.com/api/juststatus/allstatus`
      )
      .then(response => {
        this.isLoading = false;
        this.statusCodes = response.data;
      });
  },
  methods: {
    isStatusOnSearch: function(status) {
      return status.toString().includes(this.pesquisa);
    },
    definirCorStatus: function(status) {
      switch (status.toString()[0]) {
        case "1":
          return "is-ligth";
        case "2":
          return "is-success";
        case "3":
          return "is-info";
        case "4":
          return "is-danger";
        case "5":
          return "is-warning";
      }
    }
  }
};
</script>

<style scoped lang="less">
.all-status {
  text-align: center;
  margin-top: 10px;

  .status {
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;

    &:hover {
      filter: brightness(110%);
    }
  }
}
</style>