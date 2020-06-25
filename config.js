const config = {
  'mainnet': {
    'baseURL': 'https://dashboard-api.tokamak.network',
    'prefixTransactionHash': 'https://etherscan.io/tx/',
    'prefixAddress': 'https://etherscan.io/address/',
    'network': '1',
    'contractAddress': {
      'TON': '',
      'Swapper': '',
      'StrategicTON': {
        'token': '0x2801265c6f888f5a9e1b72ee175fc0091e007080',
        'vesting': ''
      },
      'PrivateTON': {
        'token': '0x34D70fe2F63D2404c979cE2A7B101c9C840a63d7',
        'vesting': ''
      },
      'SeedTON': {
        'token': '0x2801265c6f888f5a9e1b72ee175fc0091e007080',
        'vesting': ''
      },
      'MarketingTON': {
        'token': '0x8Ae43F11DDd3fac5bbD84ab0BA795E1e51b78df7',
        'vesting': ''
      },
    }
  },
  'rinkeby': {
    'baseURL': 'https://dashboard-api.tokamak.network/rinkeby',
    'prefixTransactionHash': 'https://rinkeby.etherscan.io/tx/',
    'prefixAddress': 'https://rinkeby.etherscan.io/address/',
    'network': '4',
    'contractAddress': {
      'TON': '0xceBc1eBcAFc7dB4F5A6848554F385aEa2Da86c09',
      'Swapper': '0x4d678902A155bcd40A061410E85B1614dd8E314A',
      'StrategicTON': {
        'token': '',
        'vesting': '0x999cd9f58C9C4283f94c1C66b3f65CE1130889E3'
      },
      'PrivateTON': {
        'token': '',
        'vesting': '0x90F0AB1EA35a98176e82932bDf01A0a0FcA2A2Ee'
      },
      'SeedTON': {
        'token': '',
        'vesting': '0x059572D593C0d84dfEE1662061344615FECb6486'
      },
      'MarketingTON': {
        'token': '',
        'vesting': '0x50f27d040D24B51d7E0d39122C2E367228cC2D2A'
      },
    }
  },
  'development': {
    'baseURL': 'http://127.0.0.1:9002',
    'prefixTransactionHash': 'https://rinkeby.etherscan.io/tx/',
    'prefixAddress': 'https://rinkeby.etherscan.io/address/',
    'network': '1337',
    'contractAddress': {
      'TON': '',
      'Swapper': '',
      'StrategicTON': {
        'token': '',
        'vesting': ''
      },
      'PrivateTON': {
        'token': '',
        'vesting': ''
      },
      'SeedTON': {
        'token': '',
        'vesting': ''
      },
      'MarketingTON': {
        'token': '',
        'vesting': ''
      },
    }
  },
};

const query = window.location.search;
const params = new URLSearchParams(query);
const network = params.get('network');
export function getConfig () {
  switch (network) {
  case 'rinkeby':
    return config.rinkeby;
  case 'development':
    return config.development;
  default:
    // return config.mainnet;
    return config;
  }
}

export function getLink (type) {
  // TODO: migrate to config/default.json
  if (type === 'use') {
    return 'https://docs.tokamak.network/';
  } else if (type === 'register') {
    return 'https://docs.tokamak.network/';
  }
}
