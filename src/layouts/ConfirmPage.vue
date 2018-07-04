<template>
  <v-app>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-btn icon>
        <v-icon>fingerprint</v-icon>
      </v-btn>
      <v-toolbar-title>BLOCK - IN</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click="goHomePage()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <div>
      <v-alert :value="true" color="emphasis" type="success">
        New Contraction Confirmed
      </v-alert>
    </div>

    <v-container fluid grid-list-lg>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-card color="white" class="dark--text">
            <v-container fluid grid-list-lg>
              <v-layout>
                <v-flex xs10 column>
                  <v-avatar>
                    <img
                      src="https://s3.amazonaws.com/vuetify-docs/images/john.jpg"
                      alt="John"
                    >
                  </v-avatar>
                  <div class="describe">
                    <div class="headline">Welcome to {{ ownerName }}'s house</div>
                    <!-- <div class="headline">Now you can control devices!</div> -->
                    <div>phone : {{ ownerPhone }}</div>
                  </div>
                </v-flex>
                <v-flex class="charge-button" xs2>
                  <v-icon medium>share</v-icon>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 class="total-price">
                  <div>Deposit : {{ deposit }} ETH</div>
                  <div>(1 Eth = 1000000000000000000 Wei)</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
import { callMethod, sendMethod } from '../util/api';
import { USER_ACCOUNT } from '../util/constant';

export default {
  name: 'ConfirmPage',
  data() {
    return {
      account: USER_ACCOUNT,
      ownerName: '',
      ownerPhone: '',
      deposit: 0
    };
  },
  methods: {
    goHomePage() {
      this.$router.push({ name: 'MyPage' });
    },
    async getOwner() {
      const homeIndex = this.$route.query.homeIndex || 1;

      await callMethod({
        method: 'getHome',
        from: this.account,
        param: [
          homeIndex,
        ]
      }).then(async (res) => {
          const home = res.data.ret;
          console.log('home : ',home);
          this.deposit = home._deposit;

          await callMethod({
            method: 'getCustomer',
            from: this.account,
            param: [
              home._homeOwner,
            ]
          }).then((res) => {
            const owner = res.data.ret;
            console.log('owner : ',owner);
            this.ownerName = owner._name;
            this.ownerPhone = owner._phone;
          });
      });
    }
  },
  mounted() {
    this.getOwner();
  },
};
</script>


<style scoped>
.total-price > div {
  color: #6200ee;
}
.device-wrapper .flex:first-child {
  padding-right: 4px;
  margin-left: 8px;
}
.device-wrapper .flex:last-child {
  padding-left: 4px;
  margin-right: 8px;
}
.v-alert {
  margin: 16px;
  font-size: 24px;
  box-shadow:
    0 3px 5px -1px rgba(0, 0, 0, .2),
    0 6px 10px 0 rgba(0, 0, 0, .14),
    0 1px 18px 0 rgba(0, 0, 0, .12);
  border: none !important;
}
</style>