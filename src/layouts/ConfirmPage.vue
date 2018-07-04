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
        <v-btn icon @click="goNextPage()">
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
                  <div>Deposit : $20.00</div>
                  <div>($20 = 134 DAC)</div>
                </v-flex>
              </v-layout>
            </v-container>

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
            
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
export default {
  name: 'ConfirmPage',
  methods: {
    goNextPage() {
      this.$router.push({ name: 'MyPage' });
    },
  },
};
</script>


<style scoped>
.describe {
  display: inline-block;
  margin-left: 8px;
}
.total-price > div {
  text-align: center;
  vertical-align: middle;
  font-size: 24px;
  font-weight: bold;
  color: #6200ee;
}
.device-wrapper {
  margin-bottom: 20px;
}
.device-wrapper .flex:first-child {
  padding-right: 4px;
  margin-left: 8px;
}
.device-wrapper .flex:last-child {
  padding-left: 4px;
  margin-right: 8px;
}
.price {
  font-weight: bold;
  font-size: 24px;
}
.white--text strong {
  padding-left: 16px;
  font-size: 20px;
}
.v-alert {
  margin: 16px;
  font-size: 24px;
}
</style>