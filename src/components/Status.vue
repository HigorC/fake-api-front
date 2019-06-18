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
        <div class="all-status">
          <a
            target="_blank"
            v-for="status in statusCodes"
            v-show="isStatusOnSearch(status)"
            :href="'https://fake-api-back.herokuapp.com/api/juststatus/'+status"
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
      pesquisa: ""
    };
  },
  created: function() {

  this.isLoading = true;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(`${proxyurl}https://fake-api-back.herokuapp.com/api/status`)
      .then(response => {
        this.isLoading = false;
        this.statusCodes = response.data;
      });
  },
  methods: {
    isStatusOnSearch: function(status) {
      return status.toString().includes(this.pesquisa);
    },
    callStatusApi: function(status) {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      axios
        .get(
          `${proxyurl}https://fake-api-back.herokuapp.com/api/status/${status}`
        )
        .then(response => {
          this.statusCodes = response.data;
        });
    },
    definirCorStatus: function(status) {
      switch (status.toString()[0]) {
        case "1":
          return "is-ligth";
          break;
        case "2":
          return "is-success";
          break;
        case "3":
          return "is-info";
          break;
        case "4":
          return "is-danger";
          break;
        case "5":
          return "is-warning";
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.all-status {
  margin-top: 10px;

  .status {
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;

    &:hover{
      filter: brightness(110%);
    }
  }
}
</style>