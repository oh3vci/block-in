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
                    <div class="headline customer">{{ name }}</div>
                    <div>{{ phone }}</div>
                  </div>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs8>
                  <div class="text-primary section--head">Balance</div>
                  <div class="balance-amount">${{ totalPrice }}</div>
                </v-flex>
                <v-flex class="charge-button" xs4>
                  <v-btn color="primary">CHARGE</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

        <v-flex v-if="isCheckedin" xs12>
          <div class="section--head">Usage</div>
        </v-flex>

        <v-flex v-if="isCheckedin" xs12>
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
                <v-flex class="charge-button" xs4>
                  <v-btn color="primary">LEAVE</v-btn>
                </v-flex>
              </v-layout>
              <v-layout>
                <div class="text-primary section--deposit">Deposit : $20.00</div>
              </v-layout>
            </v-container>

            <v-layout row wrap class="device-wrapper">
              <v-flex>
                <v-card>
                  <v-container fluid grid-list-lg>
                    <v-layout>
                      <v-flex xs12 flexbox>
                        <span>Air Conditioner</span>
                        <div class="price">$3.0</div>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 flexbox>
                        <v-btn block color="primary" dark>
                          <v-icon>share</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>

              <v-flex>
                <v-card>
                  <v-container fluid grid-list-lg>
                    <v-layout>
                      <v-flex xs12 flexbox>
                        <span>Door Lock</span>
                        <div class="price">$3.0</div>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 flexbox>
                        <v-btn block color="primary" dark>
                          <v-icon>share</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
            
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
                <v-flex class="charge-button" xs2>
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
                <v-flex class="charge-button" xs2>
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
import { callMethod } from '../util/api';
import { USER_ACCOUNT } from '../util/constant';

export default {
  name: 'MyPage',
  methods: {
    goNextPage() {
      this.$router.push({ name: 'JoinContractPage' });
    },
  },
  data() {
    return {
      name: '',
      deposit: 0,
      totalPrice: 0,
      phone: '',
      isCheckedin: false,
    };
  },
  mounted() {
    const payloadCallMethod = {
      method: 'getCustomer',
      from: USER_ACCOUNT,
      param: [USER_ACCOUNT],
    };
    callMethod(payloadCallMethod).then((res) => {
      const data = res.data.ret;

      console.log(data);
      this.name = data._name;
      this.deposit = data._deposit;
      this.phone = data._phone;
      this.totalPrice = data._totalPrice;
      this.isCheckedin = data._isCheckedin;
    });
  },
};
</script>


<style scoped>
.balance-amount {
  font-size: 48px;
}
.customer {
  font-weight: bold;
}
.section--deposit {
  font-weight: bold;
  font-size: 18px;
  margin-left: 8px;
}
.device-wrapper .flex:first-child {
  padding-right: 4px;
  margin-left: 8px;
}
.device-wrapper .flex:last-child {
  padding-left: 4px;
  margin-right: 8px;
}
.device-wrapper .container {
  padding: 8px !important;
}
.device-wrapper {
  padding-bottom: 8px;
}
.v-card {
  border: solid 1px rgba(0, 0, 0, 0.12);
}
</style>