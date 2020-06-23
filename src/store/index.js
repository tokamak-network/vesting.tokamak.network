import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import router from '@/router';
import web3EthABI from 'web3-eth-abi';
import { cloneDeep, isEqual, range, uniq, orderBy } from 'lodash';
import numeral from 'numeral';
import { createWeb3Contract } from '@/helpers/Contract';
import { BN } from 'web3-utils';
import { setPendingTransactions, getPendingTransactions } from '@/helpers/localStorage';

import SwapperABI from '@/contracts/abi/Swapper.json';
import VestingTokenABI from '@/contracts/abi/VestingToken.json';
import TokenABI from '@/contracts/abi/Ton.json';

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

  // contract of managers
  TON: {},
  WTON: {},
  STON: {},
  PTON: {},
  MTON: {},
  Benificiary: {},
  

  // balance
  ethBalance: _ETH('0'),
  tonBalance: _TON('0'),
  

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
    IS_LOADINNG: (state, isLoading) => {
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
    SET_TOKENS: (state, tokens) => {
      state.tokens = tokens;
    },
    SET_MARKETING_TON_START: (state, startDate) => {
      state.startDate = startDate;
    },
    SET_MARKETING_TON_CLIFF: (state, cliff) => {
      state.cliff = cliff;
    },
    SET_MARKETING_TON_END: (state, endDate) => {
      state.endDate = endDate
    },
    SET_TRANSACTIONS: (state, transactions) => {
      state.transactions = transactions;
    },
    ADD_TRANSACTION: (state, newTransaction) => {
      if (!state.transactions.find(transaction => transaction.transactionHash === newTransaction.transactionHash)) {
        state.transactions.push(newTransaction);
      }
    },
    SET_PENDING_TRANSACTIONS: (state, pendingTransactions) => {
      state.pendingTransactions = pendingTransactions;
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
    UPDATE_USER: (state, newUser) => {
      const index = state.users.indexOf(prevUser);
      const prevOperator = state.users.find(user => user.rootchain === newUser.rootchain);
      for (const [key, value] of Object.entries(newUser)) {
        prevOperator[key] = value;
      }
      Vue.set(state.users, index, prevUser);
    },
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
      const transactions = await getTransactions(user);

      await Promise.all([
        context.dispatch('setTransactionsAndPendingTransactions', transactions),
        context.dispatch('set', web3),
      ]);
      await new Promise(resolve => setTimeout(resolve, 1000)); // https://github.com/Onther-Tech/dashboard.tokamak.network/issues/81
      context.commit('SIGN_IN');
      context.commit('IS_LOADING', false);
      // router.replace({ path: 'dashboard', query: { network: router.app.$route.query.network } }).catch(err => {});
    },
    async set (context, web3) {
      const blockNumber = await web3.eth.getBlockNumber();
      const block = await web3.eth.getBlock(blockNumber);
      context.commit('SET_BLOCK_NUMBER', blockNumber);
      context.commit('SET_BLOCK_TIMESTAMP', block.timestamp);

      await Promise.all([
        context.dispatch('setUsers', contractAddress),
        context.dispatch('setBalance'),
        context.dispatch('checkPendingTransactions'),
      ]).catch(err => {
        // after logout, error can be happened
      });
    },
    async setVestingTokenns (context, tokens) {
      const user = context.state.user;
      const tokenVestingABIs = {
        TONABI,
        privateTONABI,
        marketingTONABI,
        seedTONABI,
        startegicTONABI
      };
      for (const [name, address] of Object.entries(managers)) {
        const abi = tokenVestingABIs[`${name}ABI`];
        tokens[name] = createWeb3Contract(abi, address, user);
      }
      context.commit('SET_TOKENS', tokens);
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
          const minedTransaction = await addTransaction(transaction);
          context.commit('ADD_TRANSACTION', minedTransaction);
          context.commit('DELETE_PENDING_TRANSACTION', minedTransaction);

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
    async getData() {
      const { address, token } = this.props
  
      const tokenVesting = await getTokenVesting(address)
      const tokenContract = await getSimpleToken(token)
  
      const start = await tokenVesting.start()
      const duration = await tokenVesting.duration()
      const end = start.plus(duration)
  
      const balance  = await tokenContract.balanceOf(address)
      const released = await tokenVesting.released(token)
      const total = balance.plus(released)
  
      this.setState({
        start,
        end,
        cliff: await tokenVesting.cliff(),
        total,
        released,
        vested: await tokenVesting.vestedAmount(token),
        decimals: await tokenContract.decimals(),
        beneficiary: await tokenVesting.beneficiary(),
        owner: await tokenVesting.owner(),
        revocable: await tokenVesting.revocable(),
        revoked: await tokenVesting.revoked(token),
        name: await tokenContract.name(),
        symbol: await tokenContract.symbol(),
        loading: false
      })
    },
    async updateUser (context, user) {
      context.commit('UPDATE_USER', user)
    },
    
    async setUsers (context, blockNumber) {
      const user = context.state.user;

      const TON = context.state.TON;
      const PTON = context.state.PTON;
      const MTON = context.state.MTON;
      const STON = context.state.STON;
      
      
      // about contract
      // const DepositManager = context.state.DepositManager;
      // const SeigManager = context.state.SeigManager;
      // const Tot = createWeb3Contract(
      //   CustomIncrementCoinageABI, await SeigManager.methods.tot().call());
      const users = context.state.users;
      const usersVesting = await Promise.all(
        users.map(async userVesting => {
          const tokenVestingAddress = userVesting.vestingAddress;
          const tokenName = userVesting.name;
          const tokenAddress = userVesting.tokenAddress
          const tokenContract = createWeb3Contract(TokenABI, tokenAddress)
          const tokenVesting = createWeb3Contract(VestingTokenABI, tokenVestingAddress);
          // const Swapper = createWeb3Contract(SwapperABI, address);

          const startDate = await tokenVesting.methods.start();
          const duraion = await tokenVesting.emthods.duration();
          const end = start.plus(duration)
          
          const balance = await tokenContract.balanceOf(user)
          const released = await tokenVesting.released(token) // check token
          const total = balance.plus(released)

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
            symbol
          ] = await Promise.all([
            startDate,
            end,
            await tokenVesting.methods.cliff(),
            total,
            released,
            await tokenVesting.methods.vestedAmount(token),
            await tokenContract.methods.decimals(),
            await tokenVesting.beneficiary(),
            await tokenVesting.owner(),
            await tokenVesting.revocable(),
            await tokenVesting.revoked(token),
            await tokenContract.name(),
            await tokenContract.symbol(),
          ]);

          userVesting.start = start
          userVesting.end = end
          userVesting.cliff = cliff
          userVesting.total = total
          userVesting.released = released
          userVesting.vested = vested
          userVesting.decimals = decimals
          userVesting.beneficiary = beneficiary
          userVesting.owner = owner
          userVesting.revocable = revocable
          userVesting.revoked = revoked
          userVesting.name = name
          userVesting.symbol = symbol

          return userVesting
        })
      );
      context.commit('SET_USERS', usersVesting);    
    },
  },
  getters: {
    initialState: (state) => {
      return isEqual(state, initialState);
    },
  }
});