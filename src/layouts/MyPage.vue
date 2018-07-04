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
    </v-toolbar>

    <v-container fluid grid-list-lg>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-card color="white" class="dark--text">
            <v-container fluid grid-list-lg>
              <v-layout>
                <v-flex xs12 column>
                  <div>
                    <div class="headline customer">JAEHO SUNG</div>
                    <div>user</div>
                  </div>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs8>
                  <div class="text-primary section--head">Balance</div>
                  <div class="balance-amount">$70.50</div>
                </v-flex>
                <v-flex class="charge-button" xs4>
                  <v-btn color="primary">CHARGE</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <div class="section--head">Previous Contracts</div>
        </v-flex>

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
                    <div class="headline">Jennie Kim</div>
                    <div>18.06.24 ~ 18.06.26</div>
                  </div>
                </v-flex>
                <v-flex xs2>
                  <v-icon medium>share</v-icon>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 class="total-price">
                  <div>Total: $10.00</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

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
                    <div class="headline">Jennie Kim</div>
                    <div>18.06.24 ~ 18.06.26</div>
                  </div>
                </v-flex>
                <v-flex xs2>
                  <v-icon medium>share</v-icon>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 class="total-price">
                  <div>Total: $10.00</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

    <v-footer
      color="primary"
      app
      fixed
    >
      <v-fab-transition>
        <v-btn
          color="emphasis"
          dark
          absolute
          top
          right
          fab
          @click="goNextPage()"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-footer>
  </v-app>
</template>


<script>
import { getAccounts, callMethod, sendMethod } from '../util/api';

export default {
  name: 'MyPage',
  methods: {
    goNextPage() {
      this.$router.push({ name: 'JoinContractPage' });
    },
  },
  mounted() {
    getAccounts();

    const payloadCallMethod = {
      method: 'contractOwner',
      from: '0x98bcD3D00454BEeCAf45Cc204F68962F7C153Cfd',
      param: [],
    };
    callMethod(payloadCallMethod).then(console.log);

    const payloadSendMethod = {
      method: 'registHome',
      from: '0x98bcD3D00454BEeCAf45Cc204F68962F7C153Cfd',
      gas: 100000,
      param: [
        '0x98bcD3D00454BEeCAf45Cc204F68962F7C153Cfd',
      ],
    };
    sendMethod(payloadSendMethod).then(console.log);
  },
};
</script>


<style scoped>
.balance-amount {
  font-size: 48px;
}
.total-price > div {
  text-align: center;
  vertical-align: middle;
  font-size: 24px;
  font-weight: bold;
}
.customer {
  font-weight: bold;
}
.charge-button {
  display: flex;
  justify-content : flex-end !important;
  -webkit-justify-content: flex-end !important;
}
.section--head {
  font-weight: bold;
  font-size: 18px;
}
.describe {
  display: inline-block;
  margin-left: 8px;
}
.text-primary {
  color: #6200ee;
}
.v-avatar {
  vertical-align: top !important;
}
</style>