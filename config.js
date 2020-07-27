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
        'vesting': '',
      },
      'PrivateTON': {
        'token': '0x34D70fe2F63D2404c979cE2A7B101c9C840a63d7',
        'vesting': '',
      },
      'SeedTON': {
        'token': '0x2801265c6f888f5a9e1b72ee175fc0091e007080',
        'vesting': '',
      },
      'MarketingTON': {
        'token': '0x8Ae43F11DDd3fac5bbD84ab0BA795E1e51b78df7',
        'vesting': '',
      },
    },
  },
  'rinkeby': {
    'baseURL': 'https://dashboard-api.tokamak.network/rinkeby',
    'prefixTransactionHash': 'https://rinkeby.etherscan.io/tx/',
    'prefixAddress': 'https://rinkeby.etherscan.io/address/',
    'network': '4',
    'contractAddress': {
      'TON':'0x8F5a66E14d0418a3abfb504e5EF9c9109A70a18a',
      'VestingSwapper':'0xAF224f1AB65A7BBD1baD3f056Bd2cbFD97105dc8',
      'StepSwapper':'0xE35a9aB959C2F8BC44BbBaDF101392561Fd7108B',
      'TONVault':'0x022d841643746077f858E5B2154c4AE91Bb362E9',
      'StrategicTON': {
        'token': '',
        'vesting': '0x3e322Fc1496faf350c630E954A745432Fb778D45',
      },
      'PrivateTON': {
        'token': '',
        'vesting': '0xe34554f295097413D182ca04e9449e7DD6D7eA5C',
      },
      'SeedTON': {
        'token': '',
        'vesting': '0x7CA000300Ef74026EF25bA85B20a6f2EDC944786',
      },
      'MarketingTON': {
        'token': '',
        'vesting': '0x84019083657ddb2b3EE3002Ae873569D015B9692',
      },
      'DaoTON': {
        'token': '',
        'vesting': '0xdf63Dc23fD46be8e2F5044008Aa16b44b1754C29',
      },
      'TeamTON': {
        'token': '',
        'vesting': '0xcd4707CbD7D1C16441E268a0f7DFc83C8EECd1e4',
      },
      'AdvisorTON': {
        'token': '',
        'vesting': '0xC5730f3A5808F013B26899C0ebb9B81959AabCee',
      },
      'BusinessTON': {
        'token': '',
        'vesting': '0x24072B47E1ee9f79eEC66865b05d9EB4aA926215',
      },
      'ReserveTON': {
        'token': '',
        'vesting': '0xA91FF5B566f3EF4F878f1b4e317141f1d814Bb46',
      },
    },
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
        'vesting': '',
      },
      'PrivateTON': {
        'token': '',
        'vesting': '',
      },
      'SeedTON': {
        'token': '',
        'vesting': '',
      },
      'MarketingTON': {
        'token': '',
        'vesting': '',
      },
    },
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
