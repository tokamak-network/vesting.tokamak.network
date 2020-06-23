import moment from 'moment';
const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

import { Currency, createCurrency } from '@makerdao/currency';
const _TON = createCurrency('TON');
const _WTON = createCurrency('WTON');
// const _POWER = createCurrency('POWER');

import { getConfig } from '../../config.js';
import numeral from 'numeral';

export function hexSlicer (address = '') {
  if (address.length < 11) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Note: Despite Unix timestamps being UTC-based, this function creates a moment object in local mode.
// (https://momentjs.com/docs/#/parsing/unix-timestamp/)
export function formattedTimestamp (timestamp) {
  return moment.unix(timestamp).format('LLL');
}

export function fromNow (timestamp, suffix) {
  return moment.unix(timestamp).fromNow(suffix);
}

export function stringToTON (amount) {
  try {
    return _TON.ray(amount);
  } catch (e) {
    return amount;
  }
}

export function nameOfNetwork (networkId) {
  if (typeof networkId === 'string') {
    networkId = parseInt(networkId);
  }

  if (networkId === 1) return 'Mainnet';
  if (networkId === 2) return 'Morden';
  if (networkId === 3) return 'Ropsten';
  if (networkId === 4) return 'Rinkeby';
  if (networkId === 5) return 'Goerli';
  if (networkId === 16) return 'Faraday';
  if (networkId === 42) return 'Covan';
  if (networkId === 99) return 'POA';
  if (networkId === 1337) return 'Development';

  return networkId;
}

// https://github.com/Onther-Tech/dashboard.tokamak.network/issues/49
export function currencyAmount (amount) {
  if (amount instanceof Currency) {
    if (amount.symbol === 'POWER') {
      const tonAmount = amount.toBigNumber().toString();
      const index = tonAmount.indexOf('.');
      return index > -1 ? `${tonAmount.slice(0, index + 3)} POWER` : amount;
    } else if (amount.symbol === 'TON') {
      const tonAmount = amount.toBigNumber().toString();
      const index = tonAmount.indexOf('.');
      return index > -1 ? `${tonAmount.slice(0, index + 3)} MTON` : tonAmount + '.00 MTON';
    } else if (amount.symbol === 'WTON'){
      const wtonAmount = amount.toBigNumber().toString();
      const index = wtonAmount.indexOf('.');
      return index > -1 ? `${wtonAmount.slice(0, index + 3)} MTON` : wtonAmount + '.00 MTON';
    }
  } else {
    return amount;
  }
}

// deprecated (will be deleted)
export function currencyAmountFromNumberString (symbol, amount) {
  if (symbol === 'TON') {
    amount = _TON.wei(amount);
    const tonAmount = amount.toBigNumber().toString();
    const index = tonAmount.indexOf('.');
    return index > -1 ? `${tonAmount.slice(0, index + 3)} MTON` : tonAmount + '.00 MTON';
  } else {
    amount = _WTON.ray(amount);
    const wtonAmount = amount.toBigNumber().toString();
    const index = wtonAmount.indexOf('.');
    return index > -1 ? `${wtonAmount.slice(0, index + 3)} MTON` : wtonAmount + '.00 MTON';
  }
}

export function toExplorer (type, param) {
  if (type === 'transactionHash') {
    return getConfig().prefixTransactionHash + param;
  } else if (type === 'address') {
    return getConfig().prefixAddress + param;
  } else {
    return this.content;
  }
}

export function userSeigsRate (userStaked, userSeigs) {
  if (userStaked.eq(_WTON('0'))) {
    return '0.00%';
  }

  const sum = userStaked.add(userSeigs);
  const rate = sum.sub(userStaked).div(userStaked);
  return `${numeral(Number(rate.toBigNumber().toString())).format('0.00%')}`;
}

export function rateOf (commission) {
  if (!commission) {
    return '0 %';
  }
  return `${commission.toNumber() * 100} %`;
}

export function addressExtractor (url) {
  const lastIndex = url.lastIndexOf('/');
  return url.substring(lastIndex + 1);
}
