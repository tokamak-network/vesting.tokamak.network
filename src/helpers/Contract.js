import store from '@/store/index.js';

export function createWeb3Contract (abi, address, from) {
  try {
    const web3 = store.state.web3;
    return new web3.eth.Contract(abi, address, {
      from,
    });
  } catch (e) {
    //
  }
}
