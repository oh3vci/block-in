<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App',
};
</script>


<style>
.v-toolbar, .v-footer {
  height: 60px !important;
}
.v-toolbar__title:not(:first-child) {
  margin-left: 0;
}
.v-toolbar__content {
  height: 100% !important;
}
.v-btn--floating {
  width: 64px;
  height: 64px;
}
.v-btn--floating:not(.v-btn--depressed) {
  box-shadow: none;
}
.v-btn--floating .v-btn__content {
  border: 6px solid #fafafa;
}
.v-btn--floating .v-btn__content i {
  margin-top: 36px;
}
.v-input__control > .v-text-field__details {
  display: none !important;
}
.v-avatar {
  vertical-align: top !important;
}
.v-alert .v-alert__icon.v-icon {
  color: #fafafa !important;
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
.text-primary {
  color: #6200ee;
}
.device-wrapper {
  margin-bottom: 20px;
}
.describe {
  display: inline-block;
  margin-left: 8px;
}
.price {
  font-weight: bold;
  font-size: 24px;
}
.total-price > div {
  text-align: center;
  vertical-align: middle;
  font-size: 24px;
  font-weight: bold;
}
.white--text strong {
  padding-left: 16px;
  font-size: 20px;
}
</style>