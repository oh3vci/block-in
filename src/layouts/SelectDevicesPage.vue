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
              <div class="headline">Jennie Kim</div>
              <div>She was born in Anyang, a city in the province of Gyeong</div>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-divider></v-divider>
      <div class="list-title">
        <v-flex xs12 column>
          <div class="text-primary section--head">Date</div>
          <div class="describe">
            <div>18.06.24 10:00 AM ~ 18.06.26 15:00 PM</div>
          </div>
        </v-flex>
      </div>
      <v-divider></v-divider>
      <div class="list-title">
        <v-flex xs12 column>
          <div class="text-primary section--head">IoT Devices</div>
          <v-layout row wrap class="device-wrapper">

            <v-flex class="device" @click="selectDevice()">
              <v-card>
                <v-container fluid fill-height pa-2>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span>Air Conditioner</span>
                      <div class="price">$3.0</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

            <v-flex>
              <v-card>
                <v-container fluid fill-height pa-2>
                  <v-layout>
                    <v-flex xs12 align-end flexbox>
                      <span>Door Lock</span>
                      <div class="price">$3.0</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

          </v-layout>

          <v-layout row wrap class="device-wrapper">

            <v-flex>
              <v-card>
                <v-container fluid fill-height pa-2>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span>Air Conditioner</span>
                      <div class="price">$3.0</div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

            <v-flex>
              <v-card>
                <v-container fluid fill-height pa-2>
                  <v-layout>
                    <v-flex xs12 align-end flexbox>
                      <span>Door Lock</span>
                      <div class="price">$3.0</div>
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
          @click="goNextPage()"
        >
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-footer>
  </v-app>
</template>


<script>
import { callMethod } from '../util/api';

export default {
  name: 'SelectDevicesPage',
  methods: {
    goNextPage() {
      this.$router.push({ name: 'CheckContractionPage' });
    },
    goMain() {
      this.$router.push({ name: 'MyPage' });
    },
    getOwner() {
      const homeIndex = this.$route.query.homeIndex || 1;

      callMethod({
        method: 'getHome',
        from: this.account,
        param: [
          homeIndex,
        ]
      }).then((res) => {
          const home = res.data.ret;
          this.deposit = home._deposit;

          callMethod({
            method: 'getCustomer',
            from: this.account,
            param: [
              home._homeOwner,
            ]
          }).then((res) => {
            const owner = res.data.ret;
            this.ownerName = owner._name;
            this.ownerPhone = owner._phone;
          });
      });
    },
    getDevices() {
      const homeIndex = this.$route.query.homeIndex || 1;

      callMethod({
        method: 'getIoTnet',
        from: this.account,
        param: [
          homeIndex,
        ],
      }).then((res) => {
        const ioTnet = res.data.ret;

        this.numDevices = ioTnet._numDevice;

        ioTnet._permittedDevice.forEach((addressDevice) => {
          callMethod({
            method: 'getDevice',
            from: this.account,
            param: [
              addressDevice,
            ],
          }).then((res) => {
            const device = res.data.ret;
            devices.push(device);
          });
        });
      });
      

    }
  },
  data() {
    return {
      account: '0xd1a81cF0A6EBFbd8CE45e95f73f553bD2A34dCeE',
      ownerName: '',
      ownerPhone: '',
      deposit: 0,
      numDevices: 0,
      devices: []     //_name, _type, _fee, _state
    };
  },
  mounted() {
    const payloadCallMethod = {
      method: 'getCustomer',
      from: this.account,
      param: [this.account],
    };
  }
};
</script>


<style scoped>
.application {
  background-color: #ffffff !important;
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