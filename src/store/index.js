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

import SimpleSwapperABI from '@/contracts/abi/Swapper.json';
import VestingSwapperABI from '@/contracts/abi/VestingSwapper.json';
import VestingTokenABI from '@/contracts/abi/VestingToken.json';
import TokenABI from '@/contracts/abi/TON.json';
import MtonABI from '@/contracts/abi/MTON.json';
import TokenVaultABI from '@/contracts/abi/TONVault.json';
import VestingTokenStepABI from '@/contracts/abi/VestingTokenStep.json';

import { getConfig } from '../../config.js';
import { createCurrency } from '@makerdao/currency';

const _TON = createCurrency('TON');
const _MTON = createCurrency('MTON');
const _SeedTON = createCurrency('SeedTON');
const _PTON = createCurrency('PTON');
const _StrategicTON = createCurrency('StrategicTON');
const _TeamTON = createCurrency('TeamTON');
const _AdvisorTON = createCurrency('AdvisorTON');
const _BusinessTON = createCurrency('BusinessTON');
const _ReserveTON = createCurrency('ReserveTON');
const _DAO = createCurrency('DAO');

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
  teamTON: {},
  advisorTON: {},
  businessTON: {},
  reserveTON: {},
  daoTON:{},

  seedBalance: _SeedTON('0'),
  privateBalance:  _PTON('0'),
  marketingBalance: _MTON('0'),
  strategicBalance: _StrategicTON('0'),
  teamBalance: _TeamTON('0'),
  advisorBalance: _AdvisorTON('0'),
  businessBalance: _BusinessTON('0'),
  reserveBalance: _ReserveTON('0'),
  daoBalance: _DAO('0'),
  tonBalance: _TON('0'),

  tokenInfo:[],

  Benificiary: {},
  tokenList:[],
  operators: [],
  history: [],

};

const getInitialState = () => initialState;

export default new Vuex.Store({
  state: cloneDeep(initialState),
  mutations: {
    SET_INITIAL_STATE: (state) => {
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
    SET_TEAM_BALANCE: (state, balance) => {
      state.teamBalance = balance;
    },
    SET_ADVISOR_BALANCE: (state, balance) => {
      state.advisorBalance = balance;
    },
    SET_BUSINESS_BALANCE: (state, balance) => {
      state.businessBalance = balance;
    },
    SET_RESERVE_BALANCE: (state, balance) => {
      state.reserveBalance = balance;
    },
    SET_DAO_BALANCE: (state, balance) => {
      state.daoBalance = balance;
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
    SET_TEAM_TON: (state, teamTon) => {
      state.teamTON = teamTon;
    },
    SET_ADVISOR_TON: (state, advisorTon) => {
      state.advisorTON = advisorTon;
    },
    SET_BUSINESS_TON: (state, businessTon) => {
      state.businessTON = businessTon;
    },
    SET_RESERVE_TON: (state, reserveTon) => {
      state.reserveTON = reserveTon;
    },
    SET_DAO_TON: (state, daoTon) => {
      state.daoTON = daoTon;
    },
    SET_TON: (state, ton) =>{
      state.TON = ton;
    },
    SET_TOKEN_LIST: (state, tokenList) =>{
      state.tokenList = tokenList;
    },

    SET_TOKEN_INFO:(state, tokenInfo)=>{
      state.tokenInfo = tokenInfo;
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
        // context.dispatch('setTokenInfo')
        // context.dispatch('setTokenInfo')
      ]);
      await new Promise(resolve => setTimeout(resolve, 1000)); // https://github.com/Onther-Tech/dashboard.tokamak.network/issues/81
      await context.dispatch('setTokenInfo');
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
    async setTokens (context) {
      const user = context.state.user;
      const network = getConfig().mainnet.contractAddress;
      const marketingAddress = getConfig().mainnet.contractAddress.MarketingTON;
      const strategicAddress = getConfig().mainnet.contractAddress.StrategicTON;
      const seedAddress = getConfig().mainnet.contractAddress.SeedTON;
      const privateAddress = getConfig().mainnet.contractAddress.PrivateTON;
      const teamAddress = getConfig().mainnet.contractAddress.TeamTON;
      const daoAddress = getConfig().mainnet.contractAddress.DaoTON;
      const advisorAddress = getConfig().mainnet.contractAddress.AdvisorTON;
      const businessAddress = getConfig().mainnet.contractAddress.BusinessTON;
      const reserveAddress = getConfig().mainnet.contractAddress.ReserveTON;
      const marketingTon = createWeb3Contract(MtonABI, marketingAddress);
      const strategicTon = createWeb3Contract(VestingTokenABI, strategicAddress);
      const seedTon = createWeb3Contract(VestingTokenABI, seedAddress);
      const privateTon = createWeb3Contract(VestingTokenABI, privateAddress);
      const teamTon = createWeb3Contract(VestingTokenStepABI, teamAddress);
      const daoTon = createWeb3Contract(VestingTokenStepABI, daoAddress);
      const advisorTon = createWeb3Contract(VestingTokenStepABI, advisorAddress);
      const businessTon = createWeb3Contract(VestingTokenStepABI, businessAddress);
      const reserveTon = createWeb3Contract(VestingTokenStepABI, reserveAddress);
      context.commit('SET_MARKETING_TON', marketingTon);
      context.commit('SET_STRATEGIC_TON', strategicTon);
      context.commit('SET_SEED_TON', seedTon);
      context.commit('SET_PRIVATE_TON', privateTon);
      context.commit('SET_TEAM_TON', teamTon);
      context.commit('SET_ADVISOR_TON', advisorTon);
      context.commit('SET_BUSINESS_TON', businessTon);
      context.commit('SET_RESERVE_TON', reserveTon);
      context.commit('SET_DAO_TON', daoTon);
    },
    async setMarketing (context) {
      const user = context.state.user;
    },
    async setBalance (context){
      const user = context.state.user;
      const list = [];
      const tonAddress = getConfig().mainnet.contractAddress.TON;
      const ton = createWeb3Contract(TokenABI, tonAddress);
      const swapperAddress = getConfig().mainnet.contractAddress.VestingSwapper;
      const swapper = createWeb3Contract(VestingSwapperABI, swapperAddress);
      const marketingAddress = getConfig().mainnet.contractAddress.MarketingTON;
      const strategicAddress = getConfig().mainnet.contractAddress.StrategicTON;
      const seedAddress = getConfig().mainnet.contractAddress.SeedTON;
      const privateAddress = getConfig().mainnet.contractAddress.PrivateTON;
      const teamAddress = getConfig().mainnet.contractAddress.TeamTON;
      const daoAddress = getConfig().mainnet.contractAddress.DaoTON;
      const advisorAddress = getConfig().mainnet.contractAddress.AdvisorTON;
      const businessAddress = getConfig().mainnet.contractAddress.BusinessTON;
      const reserveAddress = getConfig().mainnet.contractAddress.ReserveTON;
      const marketingTON = createWeb3Contract(MtonABI, marketingAddress);
      const strategicTON = createWeb3Contract(VestingTokenABI, strategicAddress);
      const seedTON = createWeb3Contract(VestingTokenABI, seedAddress);
      const privateTON = createWeb3Contract(VestingTokenABI, privateAddress);
      const teamTON = createWeb3Contract(VestingTokenStepABI, teamAddress);
      const daoTON = createWeb3Contract(VestingTokenStepABI, daoAddress);
      const advisorTON = createWeb3Contract(VestingTokenStepABI, advisorAddress);
      const businessTON = createWeb3Contract(VestingTokenStepABI, businessAddress);
      const reserveTON = createWeb3Contract(VestingTokenStepABI, reserveAddress);
      const tonBalance = await ton.methods.balanceOf(user).call();
      const tonBalanceFormatted = _TON(tonBalance, 'wei');
      const privateTonBalance = await privateTON.methods.balanceOf(user).call();
      const marketingTonBalance = await marketingTON.methods.balanceOf(user).call();
      const seedTonBalance = await seedTON.methods.balanceOf(user).call();
      const strategicTonBalance = await strategicTON.methods.balanceOf(user).call();
      const privateDeposited = await swapper.methods.totalAmount(privateAddress, user).call();
      const seedDeposited = await swapper.methods.totalAmount(seedAddress, user).call();
      const strategicDeposited = await swapper.methods.totalAmount(strategicAddress, user).call();
      //-----------------------
      const privateReleasedAmount = await swapper.methods.released (privateAddress, user).call();
      const seedReleasedAmount = await swapper.methods.released (seedAddress, user).call();
      const strategicReleasedAmount = await swapper.methods.released (strategicAddress, user).call();
      //-----------------------
      const privatePureDeposited = Number(privateDeposited) - Number(privateReleasedAmount);
      const seedPureDeposited = Number(seedDeposited) - Number(seedReleasedAmount);
      const stretegicPureDeposited = Number(strategicDeposited) - Number(strategicReleasedAmount);
      //-----------------------
      const advisorTonBalance = await advisorTON.methods.balanceOf(user).call();
      const teamTonBalance = await teamTON.methods.balanceOf(user).call();
      const daoTonBalance = await daoTON.methods.balanceOf(user).call();
      const businessTonBalance = await businessTON.methods.balanceOf(user).call();
      const reserveTonBalance = await reserveTON.methods.balanceOf(user).call();
      //-----------------------
      const advisorReleased = await advisorTON.methods.released (user).call();
      const TeamReleased = await teamTON.methods.released (user).call();
      const businessReleased = await businessTON.methods.released (user).call();
      const reserveReleased = await reserveTON.methods.released (user).call();
      const daoReleased = await daoTON.methods.released (user).call();
      //-----------------------
      const advisorPureDeposited = Number(advisorTonBalance) - Number(advisorReleased);
      const teamPureDeposited = Number(teamTonBalance) - Number(TeamReleased);
      const businessPureDeposited = Number(businessTonBalance) - Number(businessReleased);
      const reservePureDeposited = Number(reserveTonBalance) - Number(reserveReleased);
      const daoPureDeposited = Number(daoTonBalance) - Number(daoReleased);

      context.commit('SET_PRIVATE_BALANCE', privateTonBalance);
      context.commit('SET_MARKETING_BALANCE', marketingTonBalance);
      context.commit('SET_SEED_BALANCE', seedTonBalance);
      context.commit('SET_STRATEGIC_BALANCE', strategicTonBalance);
      context.commit('SET_TEAM_BALANCE', teamTonBalance);
      context.commit('SET_ADVISOR_BALANCE', advisorTonBalance);
      context.commit('SET_BUSINESS_BALANCE', businessTonBalance);
      context.commit('SET_RESERVE_BALANCE', reserveTonBalance );
      context.commit('SET_DAO_BALANCE', daoTonBalance);
      context.commit('SET_TON_BALANCE', tonBalanceFormatted);
      if (parseFloat(seedTonBalance) !== 0 || parseFloat(seedPureDeposited) !== 0){
        list.push('SeedTON');
      }
      if (parseFloat(privateTonBalance) !== 0 || parseFloat(privatePureDeposited) !== 0){
        list.push('PrivateTON');
      }
      if (parseFloat(strategicTonBalance) !== 0 || parseFloat(stretegicPureDeposited) !== 0){
        list.push('StrategicTON');
      }
      if (parseFloat(marketingTonBalance) !== 0){
        list.push('MarketingTON');
      }
      if (parseFloat(teamTonBalance) !== 0 || parseFloat(teamPureDeposited) !== 0){
        list.push('TeamTON');
      }
      if (parseFloat(advisorTonBalance) !== 0 || parseFloat(advisorPureDeposited) !== 0){
        list.push('AdvisorTON');
      }
      if (parseFloat(businessTonBalance) !== 0 || parseFloat(businessPureDeposited) !== 0){
        list.push('BusinessTON');
      }
      if (parseFloat(reserveTonBalance) !== 0 || parseFloat(reservePureDeposited) !== 0){
        list.push('ReserveTON');
      }
      if (parseFloat(daoTonBalance) !== 0 || parseFloat(daoPureDeposited) !== 0){
        list.push('DaoTON');
      }
      context.commit('SET_TOKEN_LIST', list);

    },
    async setTokenInfo (context){
      const user = context.state.user;
      const tokenList = context.state.tokenList;
      const tokenInfo = await Promise.all(
        tokenList.map(async token =>{
          const info = {};
          const network = getConfig().mainnet.contractAddress[token];
          const address = network;
          const durationUnit = 60 * 60 * 30 * 24; // modify when we deploy it to mainnet
          info.tab = token;
          info.address = address;
          if(token === 'SeedTON' ||token === 'PrivateTON' ||token === 'StrategicTON'){
            const tokenVesting = createWeb3Contract(VestingTokenABI, address);
            const swapperAddress = getConfig().mainnet.contractAddress.VestingSwapper;
            const swapper = createWeb3Contract(VestingSwapperABI, swapperAddress);
            const startDate = await swapper.methods.start(address).call();
            info.startDate = startDate;
            const duration = await swapper.methods.duration(address).call();
            info.duration = duration;
            const endDate = Number(startDate) + (Number(duration) * durationUnit) - 7 * 60 * 60;
            info.endDate = endDate;
            const cliffDate = await swapper.methods.cliff(address).call();
            info.cliffDate = cliffDate;
            const releasedAmount = await swapper.methods.released (address, user).call();
            const totalDeposited = await swapper.methods.totalAmount(address, user).call();
            const totalAmount = Number(totalDeposited);
            const pureDeposited = totalAmount - Number(releasedAmount);
            const releasableAmount = await swapper.methods.releasableAmount(address, user).call();
            const vestedAmount = Number(releasedAmount) + Number(totalDeposited);
            const balance = await tokenVesting.methods.balanceOf(user).call();
            const graphDecimals = await tokenVesting.methods.decimals().call();
            const rate = await swapper.methods.ratio(address).call();
            info.balanceUnformatted = balance;
            info.rate = rate;
            info.graphDecimals = graphDecimals;
            if (token === 'SeedTON') {
              info.totalDeposited = _SeedTON(totalAmount, 'wei');
              info.released = _SeedTON(releasedAmount, 'wei');
              info.releasable = _SeedTON(releasableAmount, 'wei');
              info.vested = _SeedTON(vestedAmount, 'wei');
              info.graphTotal = _SeedTON(totalDeposited);
              info.total = _SeedTON(balance, 'wei');
              info.pureDeposited = _SeedTON(pureDeposited, 'wei');
            }
            else if (token === 'PrivateTON') {
              info.totalDeposited = _PTON(totalAmount, 'wei');
              info.released = _PTON(releasedAmount, 'wei');
              info.releasable = _PTON(releasableAmount, 'wei');
              info.vested = _PTON(vestedAmount, 'wei');
              info.graphTotal = _PTON(totalDeposited);
              info.total = _PTON(balance, 'wei');
              info.pureDeposited = _PTON(pureDeposited, 'wei');
            }
            else if (token === 'StrategicTON') {
              info.totalDeposited = _StrategicTON(totalAmount, 'wei');
              info.released = _StrategicTON(releasedAmount, 'wei');
              info.releasable = _StrategicTON(releasableAmount, 'wei');
              info.vested = _StrategicTON(vestedAmount, 'wei');
              info.graphTotal = _StrategicTON(totalDeposited);
              info.total = _StrategicTON(balance, 'wei');
              info.pureDeposited = _StrategicTON(pureDeposited, 'wei');
            }
          }
          else if (token === 'MarketingTON') {
            // const vestingSwapperAddress = getConfig().rinkeby.contractAddress.VestingSwapper;
            // const vestingSwapper = createWeb3Contract(VestingSwapperABI, vestingSwapperAddress);

            const swapperAddress = getConfig().mainnet.contractAddress.StepSwapper;
            const swapper = createWeb3Contract(SimpleSwapperABI, swapperAddress);
            const marketingTon = createWeb3Contract(MtonABI, address);
            const balance = await marketingTon.methods.balanceOf(user).call();
            const totalBalance = Number(balance);
            info.totalBalance =  _MTON(totalBalance, 'wei');
            // const released = await swapper.methods.released (address, user).call();
            const approvedAmount = await marketingTon.methods.allowance(user, swapperAddress).call();
            const totalApprovedAmount = Number(approvedAmount);
            const pureDeposited = totalApprovedAmount;
            info.approvedAmount = _MTON(totalApprovedAmount, 'wei');
            info.pureDeposited = _MTON(pureDeposited, 'wei');
            info.rate = 1;
          }
          else {
            const tokenVesting = createWeb3Contract(VestingTokenStepABI, address);
            const swapperAddress = getConfig().mainnet.contractAddress.StepSwapper;
            const swapper = createWeb3Contract(SimpleSwapperABI, swapperAddress);
            const startDate = await tokenVesting.methods.start().call();
            info.startDate = startDate;
            const duration = await tokenVesting.methods.duration().call();
            info.duration = duration;
            const endDate = Number(startDate) + Number(duration) * durationUnit;
            info.endDate = endDate;
            const cliffDate = await tokenVesting.methods.cliff().call();
            info.cliffDate = cliffDate;
            const releasedAmount = await tokenVesting.methods.released (user).call();
            const releasableAmount = await tokenVesting.methods.releasableAmount(user).call();
            const vestedAmount = Number(releasedAmount) + Number(releasableAmount);
            const balance = await tokenVesting.methods.balanceOf(user).call();
            const pureDeposited = Number(balance) - Number(releasedAmount);
            const totalAmount = Number(balance);
            const graphDecimals = await tokenVesting.methods.decimals().call();
            const rate = await swapper.methods.ratio(address).call();
            info.rate = rate;
            info.graphDecimals = graphDecimals;
            if (token === 'DaoTON') {
              info.totalDeposited = _DAO(totalAmount, 'wei');
              info.released = _DAO(releasedAmount, 'wei');
              info.releasable = _DAO(releasableAmount, 'wei');
              info.vested = _DAO(vestedAmount, 'wei');
              info.graphTotal = _DAO(balance);
              info.pureDeposited = _DAO(pureDeposited, 'wei');
              info.total = _DAO(balance, 'wei');
            }
            else if (token === 'TeamTON') {
              info.totalDeposited = _TeamTON(totalAmount, 'wei');
              info.released = _TeamTON(releasedAmount, 'wei');
              info.releasable = _TeamTON(releasableAmount, 'wei');
              info.vested = _TeamTON(vestedAmount, 'wei');
              info.graphTotal = _TeamTON(balance);
              info.pureDeposited = _TeamTON(pureDeposited, 'wei');
              info.total = _TeamTON(balance, 'wei');
            }
            else if (token === 'AdvisorTON') {
              info.totalDeposited = _AdvisorTON(totalAmount, 'wei');
              info.released = _AdvisorTON(releasedAmount, 'wei');
              info.releasable = _AdvisorTON(releasableAmount, 'wei');
              info.vested = _AdvisorTON(vestedAmount, 'wei');
              info.graphTotal = _AdvisorTON(balance);
              info.pureDeposited = _AdvisorTON(pureDeposited, 'wei');
              info.total = _AdvisorTON(balance, 'wei');
            }
            else if (token === 'BusinessTON') {
              info.totalDeposited = _BusinessTON(totalAmount, 'wei');
              info.released = _BusinessTON(releasedAmount, 'wei');
              info.releasable = _BusinessTON(releasableAmount, 'wei');
              info.vested = _BusinessTON(vestedAmount, 'wei');
              info.graphTotal = _BusinessTON(balance);
              info.pureDeposited = _BusinessTON(pureDeposited, 'wei');
              info.total = _BusinessTON(balance, 'wei');
            }
            else if (token === 'ReserveTON') {
              info.totalDeposited = _ReserveTON(totalAmount, 'wei');
              info.released = _ReserveTON(releasedAmount, 'wei');
              info.releasable = _ReserveTON(releasableAmount, 'wei');
              info.vested = _ReserveTON(vestedAmount, 'wei');
              info.graphTotal = _ReserveTON(balance);
              info.pureDeposited = _ReserveTON(pureDeposited, 'wei');
              info.total = _ReserveTON(balance, 'wei');
            }
          }
          return info;
        })
      );
      context.commit('SET_TOKEN_INFO', tokenInfo);
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
    tokenInfoByTab:(state) =>(tab) =>{
      return cloneDeep(state.tokenInfo.find(token => token.tab.toLowerCase() === tab.toLowerCase()));
    },
    balanceByToken:(state) =>(tab, confirmed) =>{
      if (confirmed){
        const tok = state.tokenInfo.find(token => token.tab.toLowerCase() === tab.toLowerCase());
        return tok.total;
      }
      const tok = state.tokenInfo.find(token => token.tab.toLowerCase() === tab.toLowerCase());
      return tok.total;
    },
    releasableByToken:(state) =>(tab, confirmed) =>{
      if (confirmed){
        const tok = state.tokenInfo.find(token => token.tab.toLowerCase() === tab.toLowerCase());
        return tok.releasable;
      }
      const tok = state.tokenInfo.find(token => token.tab.toLowerCase() === tab.toLowerCase());
      return tok.releasable;
    },
    updateBalances:(state)=>(tab, confirmed) =>{
      if (confirmed){
        const tok = state.tokenInfo.find(token => token.tab.toLowerCase() === tab.toLowerCase());
        return tok.pureDeposited;
      }
      else {
        const tok = state.tokenInfo.find(token => token.tab.toLowerCase() === tab.toLowerCase());
        return tok.pureDeposited;
      }
    },
    updateTonBalances:(state)=>(confirmed) =>{
      if (confirmed){
        return state.tonBalance;
      }
      else {
        return state.tonBalance;
      }
    },
  },
});
