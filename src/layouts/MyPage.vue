<template>
  <v-app>
    <v-toolbar
      color="primary"
      dark
      fixed
    >
      <v-btn icon>
        <v-icon>fingerprint</v-icon>
      </v-btn>
      <v-toolbar-title>BLOCK - IN</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <v-card>
              <v-card-title>
                <div class="headline">JAEHO SUNG</div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn
        color="emphasis"
        dark
        absolute
        bottom
        right
        fab
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-content>
    <v-footer
      color="primary"
      app
      fixed
    >
    </v-footer>
  </v-app>
</template>


<script>
export default {
  name: 'MyPage',
  data: () => ({
    drawer: null,
  }),
};
</script>


<style scoped>
.v-toolbar, .v-footer {
  height: 8.75% !important;
}
.v-toolbar__title:not(:first-child) {
  margin-left: 0;
}
.v-btn--floating {
  border: 5px solid white !important;
  box-shadow: none;
}
</style>

<style>
.v-toolbar__content {
  height: 100% !important;
}
</style>