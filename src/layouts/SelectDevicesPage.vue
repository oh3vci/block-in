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
      <v-divider></v-divider>
      <div class="list-title">
        <v-flex xs12 column>
          <div class="text-primary section--head">Deposit</div>
          <div class="describe">
            <div>{{ deposit }}</div>
          </div>
        </v-flex>
      </div>
      <v-divider></v-divider>
      <div class="list-title">
        <v-flex xs12 column>
          <div class="text-primary section--head">IoT Devices</div>
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
          console.log('home : ',home);
          this.deposit = home._deposit;

          callMethod({
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
        console.log('ioTnet',ioTnet);

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
            console.log('device : ', device);
            devices.push(device);
          });
        });
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