<template>
  <v-app>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-btn icon @click="goMain()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container
      fluid
      grid-list-lg
      class="wrapper"
    >
      <v-layout class="layout-wrapper title">
        <v-flex xs12>ENTER INTO A CONTRACT</v-flex>
      </v-layout>
      <v-layout row wrap class="layout-wrapper contents">
        <v-flex xs12>Enter an Instant Invite below</v-flex>
        <v-flex xs12>to enter into a contract.</v-flex>
        <v-flex xs12>The invite will look</v-flex>
        <v-flex xs12>something like these :</v-flex>
      </v-layout>
      <v-layout row wrap class="layout-wrapper links">
        <v-flex xs12>https://blockin.com/Kn8bDC</v-flex>
        <v-flex xs12>https://block.in/Kn8bDC</v-flex>
        <v-flex xs12>Kn8bDC</v-flex>
      </v-layout>
    </v-container>
    <v-footer fixed app>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 class="input-wrapper">
            <v-text-field
              slingle-line
              outline
              solo
            ></v-text-field>
          </v-flex>
          <v-flex xs8>
            <div class="input-hint">Type your link</div>
          </v-flex>
          <v-flex xs4>
            <v-btn class="enter-button" color="primary" @click="goNextPage()">ENTER</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>


<script>
export default {
  name: 'JoinContractPage',
  methods: {
    goMain() {
      this.$router.push({ name: 'MyPage' });
    },
    goNextPage() {
      this.$router.push({ name: 'SelectDevicesPage' });
    },
  },
};
</script>


<style scoped>
.wrapper {
  background-color: #6200ee;
}
.layout-wrapper {
  justify-content: center;
  text-align: center;
  margin-top: 20px !important;
}
.input-wrapper {
  padding-bottom: 0px !important;
}
.title {
  color: #03dac4;
  font-size: 32px !important;
  margin-top: 100px !important;
}
.contents .flex {
  color: #ffffff;
  font-size: 18px;
  padding: 0px !important;
}
.links .flex {
  color: #03dac4;
  padding: 0px !important;
}
.v-footer {
  height: 20% !important;
}
.input-hint {
  color: #6200ee;
}
.enter-button {
  margin-left: 26px !important;
}
</style>