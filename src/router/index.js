import Vue from 'vue';
import Router from 'vue-router';
import CheckContractionPage from '@/layouts/CheckContractionPage';
import ConfirmPage from '@/layouts/ConfirmPage';
import JoinContractPage from '@/layouts/JoinContractPage';
import MyPage from '@/layouts/MyPage';
import SelectDevicesPage from '@/layouts/SelectDevicesPage';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyPage',
      component: MyPage,
    },
    {
      path: '/join',
      name: 'JoinContractPage',
      component: JoinContractPage,
    },
    {
      path: '/select',
      name: 'SelectDevicesPage',
      component: SelectDevicesPage,
    },
    {
      path: '/check',
      name: 'CheckContractionPage',
      component: CheckContractionPage,
    },
    {
      path: '/confirm',
      name: 'ConfirmPage',
      component: ConfirmPage,
    },
  ],
});
