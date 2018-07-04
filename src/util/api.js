import axios from 'axios';
import { SERVER_URL, HDAC_CONTRACT } from './constant';

const instance = axios.create({
  baseURL: SERVER_URL,
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const getAccounts = function () {
  return new Promise((resolve, reject) => {
    instance.get('/block-in/api/account').then((res) => {
      console.log(res);
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  });
};

export const callMethod = function (payload) {
  return new Promise((resolve, reject) => {
    instance.post('/block-in/api/interface/call', {
      name: HDAC_CONTRACT,
      ...payload,
    }).then((res) => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  });
};

export const sendMethod = function (payload) {
  return new Promise((resolve, reject) => {
    instance.post('/block-in/api/interface/send', {
      name: HDAC_CONTRACT,
      ...payload,
    }).then((res) => {
      resolve(res);
    }).catch((error) => {
      reject(error);
    });
  });
};
