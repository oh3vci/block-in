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
                  <div class="balance-amount">{{ totalPrice }} ETH</div>
                </v-flex>
                <!-- <v-flex class="charge-button" xs4>
                  <v-btn color="primary">CHARGE</v-btn>
                </v-flex> -->
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

        <v-flex v-if="isCheckedin" xs12>
          <div class="section--head">Check In List</div>
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
                    <div class="headline">{{ ownerName }}'s</div>
                    <div>phone : {{ ownerPhone }} </div>
                  </div>
                </v-flex>
                <v-flex class="charge-button" xs4>

                  <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent max-width="290">
                      <v-btn slot="activator" color="primary">Check Out</v-btn>
                      <v-card>
                        <v-card-title class="headline">Contract</v-card-title>
                        <v-list-tile v-for="(device, index) in devices" :key="index">
                          <v-list-tile-avatar>
                            <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title>{{device._name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{device._fee}} Wei</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        
                        <v-divider></v-divider>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-sub-title>{{`Total Usage: ${getTotalUsage()} Wei`}}</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat @click="checkOut()">OK</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-layout>

                </v-flex>
              </v-layout>
              <v-layout>
                <div class="text-primary section--deposit">Deposit : {{ homeDeposit }} Eth</div>
              </v-layout>
            </v-container>

            <v-layout row wrap class="device-wrapper" v-for="(device, index) in devices" :key="index" v-if="index % 2 === 0 && index < devices.length - 1">
              <v-flex v-for="(device, idx) in devices.slice(index, index + 2)" :key="idx">
                <v-card>
                  <v-container fluid grid-list-lg>
                    <v-layout>
                      <v-flex xs12 flexbox>
                        <span>{{device._name}}</span>
                        <div class="price">{{device._fee}} Wei</div>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex xs12 flexbox>
                        <v-btn block color="tertiary" dark>
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
import { callMethod, sendMethod } from '../util/api';
import { USER_ACCOUNT } from '../util/constant';

export default {
  name: 'MyPage',
  data() {
    return {
      name: '',
      deposit: 0,
      totalPrice: 10.772,
      phone: '',
      isCheckedin: true,
      dialog: false,
      owenrName: '',
      ownerPhone: '',
      homeDeposit: 0,
      numDevices: 0,
      devices: []     //_name, _type, _fee, _state
    };
  },
  methods: {
    goNextPage() {
      this.$router.push({ name: 'JoinContractPage' });
    },
    goAgain() {
      this.$route.push({name: 'MyPage'});
    },
    async getOwner() {
      const homeIndex = this.$route.query.homeIndex || 1;

      await callMethod({
        method: 'getHome',
        from: USER_ACCOUNT,
        param: [
          homeIndex,
        ]
      }).then(async (res) => {
          const home = res.data.ret;
          console.log('home : ',home);
          this.homeDeposit = home._deposit;
          this.isCheckedin = home._isOnMarket;

          await callMethod({
            method: 'getCustomer',
            from: USER_ACCOUNT,
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
    },
    async getDevices() {
      const homeIndex = this.$route.query.homeIndex || 1;

      await callMethod({
        method: 'getIoTnet',
        from: this.account,
        param: [
          homeIndex,
        ],
      }).then((res) => {
        const ioTnet = res.data.ret;
        console.log('ioTnet',ioTnet);

        this.numDevices = ioTnet._numDevice;

        ioTnet._permittedDevice.forEach(async (addressDevice) => {
          await callMethod({
            method: 'getDevice',
            from: this.account,
            param: [
              addressDevice,
            ],
          }).then((res) => {
            const device = res.data.ret;
            console.log('device : ', device);
            this.devices.push(device);
          });
        });
      });
    },
    checkOut() {
      const homeIndex = this.$route.query.homeIndex || 1;

      sendMethod({
        method: 'checkout',
        from: USER_ACCOUNT,
        gas: 4000000,
        param: [
          homeIndex
        ]
      }).then((res) => {
        console.log(res);
        alert('Check Out!');
        this.isCheckedin = false;
        this.totalPrice += 2.91;
      })
      .catch((error) => {
        alert(error);
        this.goMain();
      });
    },
    getTotalUsage() {
      let totalUsage = 0;
      for (let device of this.devices) {
        totalUsage += Number(device._fee);
      }
      return totalUsage;
    }
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
      // this.totalPrice = data._totalPrice;
      // this.isCheckedin = data._isCheckedin;
    });
    this.getOwner();
    this.getDevices();
  },
};
</script>


<style scoped>
.balance-amount {
  font-size: 36px;
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
.v-dialog .v-card, .v-dialog--persistent .v-card, .v-dialog--active .v-card {
  background-color: #893eff;
  border-radius: 5px;
}
.v-dialog .v-card, .v-dialog .v-card .v-card__actions .v-btn {
  color: white !important;
}
.v-divider {
  background-color: white;
  width: 90%;
  margin-left: 5%;
}
.v-card .v-divider:first-of-type {
  margin-top: 16px;
}
.v-list__tile__sub-title {
  text-align: right;
}
</style>