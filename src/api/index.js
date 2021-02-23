import axios from 'axios';
import { getConfig } from '../../config.js';

function createInstance () {
  return axios.create({
    baseURL: getConfig().baseURL,
  });
}

const instance = createInstance();

export async function getManagers () {
  const res = await instance.get('/managers');
  if (res.data === '') return [];
  else return res.data;
}

export async function getPrice () {
  const res = await axios.get('https://api.upbit.com/v1/ticker?markets=BTC-TON');
  return res.data[0].trade_price;
}
