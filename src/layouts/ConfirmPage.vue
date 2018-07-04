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
export default {
  name: 'ConfirmPage',
};
</script>


<style scoped>
</style>