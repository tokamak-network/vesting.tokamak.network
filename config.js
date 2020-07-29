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
      'TON':'0xA0524104d4AA175A149dBe935a54137A7025D40c',
      'VestingSwapper':'0x0083121623cA67D9C6B8C2EBbdb2A455dcC8D2B0',
      'StepSwapper':'0x670c205e5201440d531499399AD8733E46C22299',
      'TONVault':'0x75BF0b47ed44742ee0245E1Ba5648B5f69fD5379',
      'StrategicTON': {
        'token': '',
        'vesting': '0x3C26863237d257e161d98AF4fF0Ae626e4Ae1182',
      },
      'PrivateTON': {
        'token': '',
        'vesting': '0x08e00d692B5155B204C622838480B14C03C922e2',
      },
      'SeedTON': {
        'token': '',
        'vesting': '0x97f7347A63d1F4366C36178351A8cDb36d302dBe',
      },
      'MarketingTON': {
        'token': '',
        'vesting': '0x84019083657ddb2b3EE3002Ae873569D015B9692',
      },
      'DaoTON': {
        'token': '',
        'vesting': '0xB112a1F251f41Ce5a6E8E211E8B05F8AeF7Ef9cB',
      },
      'TeamTON': {
        'token': '',
        'vesting': '0x4bbe9B49795FD5c97733D8fAf5c18dE1B18f2dC1',
      },
      'AdvisorTON': {
        'token': '',
        'vesting': '0xd2Fed03202Fd790D35135cafb2eeF0CB9a2308Fd',
      },
      'BusinessTON': {
        'token': '',
        'vesting': '0x44EBdA4e8e851623E31dF9fc6E07E6E5aa380C0F',
      },
      'ReserveTON': {
        'token': '',
        'vesting': '0xCa2f939633713358D57DD8212072602e22C72eFA',
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
