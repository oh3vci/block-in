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
                  <div>Deposit: $10.00</div>
                </v-flex>
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
                        <v-btn block color="tertiary" dark>
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
      <v-layout
        justify-center
        row
        wrap
      >
        <v-flex
          xs12
          white--text
        >
          <strong>Make a Contraction</strong>
        </v-flex>
      </v-layout>
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
          <v-icon>check</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-footer>
  </v-app>
</template>


<script>
export default {
  name: 'CheckContractionPage',
  methods: {
    goNextPage() {
      this.$router.push({ name: 'ConfirmPage' });
    },
    goMain() {
      this.$router.push({ name: 'MyPage' });
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
  },
  mounted () {
    this.$isServergetDevices();
  }
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
</style>