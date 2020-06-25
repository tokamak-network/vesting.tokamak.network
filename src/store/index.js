import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// import router from '@/router'
// import web3EthABI from 'web3-eth-abi'
import { cloneDeep, isEqual } from 'lodash';
// import numeral from 'numeral'
import { createWeb3Contract } from '@/helpers/Contract';
// import { BN } from 'web3-utils'
import { setPendingTransactions, getPendingTransactions } from '@/helpers/localStorage';

// import SwapperABI from '@/contracts/abi/Swapper.json'
import VestingTokenABI from '@/contracts/abi/VestingToken.json';
import TokenABI from '@/contracts/abi/TON.json';

import { getConfig } from '../../config.js';
import { createCurrency } from '@makerdao/currency';
const _TON = createCurrency('TON');

const initialState = {
  loading: false,
  signIn: false,

  // transactionss (based on receipt: getTransactionReceipt)
  transactions: [],
  pendingTransactions: [],

  web3: {},
  user: '',
  blockNumber: 0,
  blockTimestamp: 0,

  // contract of tokens
  TON: {},
  seedTON: {},
  privateTON: {},
  marketingTON: {},
  strategicTON: {},

  seedBalance: '',
  privateBalance: '',
  marketingBalance: '',
  strategicBalance: '',


  Benificiary: {},

  // operator
  operators: [],

  // user transaction history
  history: [],

  // not yet committed

};

const getInitialState = () => initialState;

export default new Vuex.Store({
  state: cloneDeep(initialState),
  mutations: {
    SET_INITAL_STATE: (state) => {
      const initialState = getInitialState();
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key];
      });
    },
    IS_LOADING: (state, isLoading) => {
      state.loading = isLoading;
    },
    SIGN_IN: (state) => {
      state.signIn = true;
    },
    SET_WEB3: (state, web3) => {
      state.web3 = web3;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_TON_BALANCE: (state, balance) => {
      state.tonBalance = balance;
    },
    SET_MARKETING_BALANCE: (state, balance) => {
      state.marketingBalance = balance;
    },
    SET_SEED_BALANCE: (state, balance) => {
      state.seedBalance = balance;
    },
    SET_STRATEGIC_BALANCE: (state, balance) => {
      state.strategicBalance = balance;
    },
    SET_PRIVATE_BALANCE: (state, balance) => {
      state.privateBalance = balance;
    },
    SET_TRANSACTIONS: (state, transactions) => {
      state.transactions = transactions;
    },
    ADD_TRANSACTION: (state, newTransaction) => {
      if (!state.transactions.find(transaction => transaction.transactionHash === newTransaction.transactionHash)) {
        state.transactions.push(newTransaction);
      }
    },
    SET_BLOCK_NUMBER: (state, number) => {
      state.blockNumber = number;
    },
    SET_BLOCK_TIMESTAMP: (state, timestamp) => {
      state.blockTimestamp = timestamp;
    },
    SET_PENDING_TRANSACTIONS: (state, pendingTransactions) => {
      state.pendingTransactions = pendingTransactions;
    },
    SET_TOKENS: (state, tokens) => {
      for (const [name, contract] of Object.entries(tokens)) {
        state[name] = contract;
      }
    },
    SET_MARKETING_TON: (state, marketingTon) => {
      state.marketingTON = marketingTon;
    },
    SET_STRATEGIC_TON: (state, strategicTon) => {
      state.strategicTON = strategicTon;
    },
    SET_SEED_TON: (state, seedTon) => {
      state.seedTON = seedTon;
    },
    SET_PRIVATE_TON: (state, privateTon) => {
      state.privateTON = privateTon;
    },
    ADD_PENDING_TRANSACTION: (state, newPendingTransaction) => {
      if (!state.pendingTransactions.find(pendingTransaction => pendingTransaction.transactionHash === newPendingTransaction.transactionHash)) {
        state.pendingTransactions.push(newPendingTransaction);
      }
      setPendingTransactions(state.pendingTransactions);
    },
    DELETE_PENDING_TRANSACTION: (state, minedTransaction) => {
      state.pendingTransactions.splice(state.pendingTransactions.map(pendingTransaction => pendingTransaction.transactionHash).indexOf(minedTransaction.transactionHash), 1);
      setPendingTransactions(state.pendingTransactions);
    },
    // UPDATE_OPERATOR: (state, newOperator) => {
    //   const index = state.operators.indexOf(prevOperator)
    //   const prevOperator = state.operators.find(operator => operator.rootchain === newOperator.rootchain);
    //   for (const [key, value] of Object.entries(newOperator)) {
    //     prevOperator[key] = value
    //   }
    //   Vue.set(state.operators, index, prevOperator)
    // }
  },
  actions: {
    logout (context) {
      context.commit('SET_INITIAL_STATE');
    },
    async signIn (context, web3) {
      context.commit('IS_LOADING', true);
      context.commit('SET_WEB3', web3);

      const user = (await web3.eth.getAccounts())[0];
      context.commit('SET_USER', user);

      await Promise.all([
        context.dispatch('set', web3),
      ]);
      await new Promise(resolve => setTimeout(resolve, 1000)); // https://github.com/Onther-Tech/dashboard.tokamak.network/issues/81
      context.commit('SIGN_IN');
      context.commit('IS_LOADING', false);
      // router.replace({ path: 'dashboard', query: { network: router.app.$route.query.network } }).catch(err => {});
    },
    async set (context, web3) {
      const blockNumber = await web3.eth.getBlockNumber();
      // const block = await web3.eth.getBlock(blockNumber)
      context.commit('SET_BLOCK_NUMBER', blockNumber);
      // context.commit('SET_BLOCK_TIMESTAMP', block.timestamp)

      await Promise.all([
        context.dispatch('checkPendingTransactions'),
        context.dispatch('setBalance'),
      ]);
    },
    async setTokens (context, tokens) {
      const user = context.state.user;

      // const network = getConfig().rinkeby.contractAddress;
      const marketingAddress = getConfig().rinkeby.contractAddress.MarketingTON.vesting;
      const strategicAddress = getConfig().rinkeby.contractAddress.StrategicTON.vesting;
      const seedAddress = getConfig().rinkeby.contractAddress.SeedTON.vesting;
      const privateAddress = getConfig().rinkeby.contractAddress.PrivateTON.vesting;

      const marketingTon = createWeb3Contract(VestingTokenABI, marketingAddress);
      const strategicTon = createWeb3Contract(VestingTokenABI, strategicAddress);
      const seedTon = createWeb3Contract(VestingTokenABI, seedAddress);
      const privateTon = createWeb3Contract(VestingTokenABI, privateAddress);
      console.log(privateTon);
      context.commit('SET_MARKETING_TON', marketingTon);
      context.commit('SET_STRATEGIC_TON', strategicTon);
      context.commit('SET_SEED_TON', seedTon);
      context.commit('SET_PRIVATE_TON', privateTon);
    },
    async setMarketing (context) {
      const user = context.state.user;

      // const marketings = context.state.marketings;
      // const marketingTons = await Promise.all(
      //   marketings.map(async marketingTon => {
      //     const network = getConfig().rinkeby.contractAddreess;
      //     const address = network.MarketingTON.vesting;
      //     const tokenVesting = createWeb3Contract(VestingTokenABI, address);

      //     const startDate = await tokenVesting.methods.start().call();
      //     const duration = await tokenVesting.methods.duration().call();
      //     const endDate = Number(startDate) + Number(duration);
      //     const cliffDate = await tokenVesting.methods.cliff().call();

      //     const released = await tokenVesting.methods.released(context.state.user).call();

      //     const releasableAmount = await tokenVesting.methods.releasableAmount(context.state.user).call();
      //     const totalAmount = Number(releasableAmount) + Number(released);

      //     marketingTon.start = new Date(Number(startDate)*1000);
      //     marketingTon.end = new Date(endDate*1000);
      //     marketingTon.cliff = new Date(Number(cliffDate)*1000);
      //     marketingTon.released = _TON(released, 'wei');
      //     marketingTon.total = _TON(totalAmount, 'wei');
      //     marketingTon.releasable = _TON(releasableAmount, 'wei');
      //     // this.vested = await tokenVesting.methods.vestedAmount(store.state.user).call()
      //     marketingTon.beneficiary = context.state.user;

      //     return marketingTon;
      // })
      // );
      // context.commit('SET_MARKETING_TON', marketingTons);
    },
    async setBalance (context){
      // const web3 = context.state.web3;
      const user = context.state.user;

      // const TON = context.state.TON;
      const marketingAddress = getConfig().rinkeby.contractAddress.MarketingTON.vesting;
      const strategicAddress = getConfig().rinkeby.contractAddress.StrategicTON.vesting;
      const seedAddress = getConfig().rinkeby.contractAddress.SeedTON.vesting;
      const privateAddress = getConfig().rinkeby.contractAddress.PrivateTON.vesting;

      const marketingTON = createWeb3Contract(VestingTokenABI, marketingAddress);
      const strategicTON = createWeb3Contract(VestingTokenABI, strategicAddress);
      const seedTON = createWeb3Contract(VestingTokenABI, seedAddress);
      const privateTON = createWeb3Contract(VestingTokenABI, privateAddress);

      // const tonBalance = await TON.methods.balanceOf(user).call();
      const privateTonBalance = await privateTON.methods.balanceOf(user).call();
      const marketingTonBalance = await marketingTON.methods.balanceOf(user).call();
      const seedTonBalance = await seedTON.methods.balanceOf(user).call();
      const strategicTonBalance = await strategicTON.methods.balanceOf(user).call();

      // context.commit('SET_TON_BALANCE', _TON.wei(tonBalance.toString()));
      context.commit('SET_PRIVATE_BALANCE', privateTonBalance);
      context.commit('SET_MARKETING_BALANCE', marketingTonBalance);
      context.commit('SET_SEED_BALANCE', seedTonBalance);
      context.commit('SET_STRATEGIC_BALANCE', strategicTonBalance);
    },
    async setTransactionsAndPendingTransactions (context, transactions) {
      context.commit('SET_TRANSACTIONS', transactions);

      const pendingTransactions = getPendingTransactions();
      context.commit('SET_PENDING_TRANSACTIONS', pendingTransactions);
    },
    async addPendingTransaction (context, transaction) {
      context.commit('ADD_PENDING_TRANSACTION', transaction);
    },
    async deletePendingTransaction (context, transaction) {
      context.commit('DELETE_PENDING_TRANSACTION', transaction);
    },
    async checkPendingTransactions (context) {
      const web3 = context.state.web3;
      const pendingTransactions = context.state.pendingTransactions;

      pendingTransactions.forEach(async transaction => {
        const receipt = await web3.eth.getTransactionReceipt(transaction.transactionHash);
        if (receipt) {
          transaction.receipt = receipt;
          // const minedTransaction = await addTransaction(transaction)
          // context.commit('ADD_TRANSACTION', minedTransaction)
          // context.commit('DELETE_PENDING_TRANSACTION', minedTransaction)

          if (receipt.status) {
            Vue.notify({
              group: 'confirmed',
              title: 'Transaction is confirmed',
              type: 'success',
              duration: 10000,
            });
          } else {
            Vue.notify({
              group: 'reverted',
              title: 'Transaction is reverted',
              type: 'error',
              duration: 10000,
            });
          }
        }
      });
    },
    async updateUser (context, user) {
      context.commit('UPDATE_USER', user);
    },
    async setUsers (context) {
      const user = context.state.user;
      // about contract
      // const DepositManager = context.state.DepositManager;
      // const SeigManager = context.state.SeigManager;
      // const Tot = createWeb3Contract(
      //   CustomIncrementCoinageABI, await SeigManager.methods.tot().call());
      const users = context.state.users;
      const usersVesting = await Promise.all(
        users.map(async userVesting => {
          const tokenVestingAddress = userVesting.vestingAddress;
          // const tokenName = userVesting.name
          const tokenAddress = userVesting.tokenAddress;
          const tokenContract = createWeb3Contract(TokenABI, tokenAddress);
          const tokenVesting = createWeb3Contract(VestingTokenABI, tokenVestingAddress);
          // const Swapper = createWeb3Contract(SwapperABI, address);

          const startDate = await tokenVesting.methods.start();
          const duration = await tokenVesting.emthods.duration();
          const endDate = startDate.plus(duration);

          const balance = await tokenContract.balanceOf(user);
          const totalReleased = await tokenVesting.released(tokenContract); // check token
          const totalBalance = balance.plus(totalReleased);

          const [
            start,
            end,
            cliff,
            total,
            released,
            vested,
            decimals,
            beneficiary,
            owner,
            revocable,
            revoked,
            name,
            symbol,
          ] = await Promise.all([
            startDate,
            endDate,
            await tokenVesting.methods.cliff(),
            totalBalance,
            totalReleased,
            await tokenVesting.methods.vestedAmount(tokenContract),
            await tokenContract.methods.decimals(),
            await tokenVesting.beneficiary(),
            await tokenVesting.owner(),
            await tokenVesting.revocable(),
            await tokenVesting.revoked(tokenContract),
            await tokenContract.name(),
            await tokenContract.symbol(),
          ]);

          userVesting.start = start;
          userVesting.end = end;
          userVesting.cliff = cliff;
          userVesting.total = total;
          userVesting.released = released;
          userVesting.vested = vested;
          userVesting.decimals = decimals;
          userVesting.beneficiary = beneficiary;
          userVesting.owner = owner;
          userVesting.revocable = revocable;
          userVesting.revoked = revoked;
          userVesting.name = name;
          userVesting.symbol = symbol;

          return userVesting;
        })
      );
      context.commit('SET_USERS', usersVesting);
    },
  },
  getters: {
    initialState: (state) => {
      return isEqual(state, initialState);
    },
  },
});
