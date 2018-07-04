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
        <v-btn icon @click="goMain()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-list three-line>
      <div class="list-title">
        <div class="text-primary section--head">Owner</div>
        <v-layout row class="flex">
          <v-flex xs2>
            <v-avatar color="red">
              <span class="white--text headline">J</span>
            </v-avatar>
          </v-flex>
          <v-flex xs10>
            <div class="describe">
              <div class="headline">{{ ownerName }}</div>
              <div>{{ ownerPhone }}</div>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <div class="list-title">
        <v-layout>
          <v-flex xs12 class="total-price">
                  <div> Deposit : {{ deposit }} Eth</div>
                  <div>(1 Eth = 1000000000000000000 Wei)</div>
          </v-flex>
        </v-layout>
      </div>
      <div class="list-title">
        <v-flex xs12 column>
          <div class="text-primary section--head">IoT Devices</div>

          <v-layout row wrap class="device-wrapper" v-for="(device, index) in devices" :key="index" v-if="index % 2 === 0 && index < devices.length - 1">
            <v-flex v-for="(device, idx) in devices.slice(index, index + 2)" :key="idx">
              <v-card>
                <v-container fluid grid-list-lg>
                  <v-layout>
                    <v-flex xs12 flexbox>
                      <span>{{device._name}}</span>
                      <div class="price">{{device._fee}} Wei / sec</div>
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

        </v-flex>
      </div>
    </v-list>

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
          @click="checkIn()"
        >
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-footer>
  </v-app>
</template>


<script>
import { callMethod, sendMethod } from '../util/api';
import { USER_ACCOUNT } from '../util/constant';

export default {
  name: 'SelectDevicesPage',
  data() {
    return {
      account: USER_ACCOUNT,
      ownerName: '',
      ownerPhone: '',
      deposit: 0,
      numDevices: 0,
      devices: []     //_name, _type, _fee, _state
    };
  },
  methods: {
    goNextPage() {
      this.$router.push({ name: 'ConfirmPage' });
    },
    goMain() {
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
    async checkIn() {
      const homeIndex = this.$route.query.homeIndex || 1;

      await sendMethod({
        method: 'checkin',
        from: this.account,
        gas: 3000000,
        param: [
          homeIndex
        ]
      }).then((res) => {
        console.log(res);
        this.goNextPage();
      })
      .catch((error) => {
        alert(error);
        this.goMain();
      });
    }
  },
  mounted() {
    this.getOwner();
    this.getDevices();
  }
};
</script>


<style scoped>
.total-price > div {
  color: #6200ee;
}
.application .theme--light.v-list, .theme--light .v-list {
  background-color: #fafafa;
}
.list-title > .flex {
  padding: 16px !important;
}
.list-title > .text-primary {
  padding-left: 16px;
}
.device-wrapper .flex:first-child {
  padding-right: 8px;
}
.device-wrapper .flex:last-child {
  padding-left: 8px;
}
</style>