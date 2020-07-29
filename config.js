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
      'TON':'0x2DCC68539F2038251217b1d3B87D05E7DFB37661',
      'VestingSwapper':'0x0083121623cA67D9C6B8C2EBbdb2A455dcC8D2B0',
      'StepSwapper':'0x9271B1C544BfC743f67aAc17F23264BC723a4602',
      'TONVault':'0x4bc17F6f4A4923E47B85AAEc83980d1C80e6F3b1',
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
        'vesting': '0x347D7FEAe640c85a6Bc39123988C7e1CaAeDe44e',
      },
      'TeamTON': {
        'token': '',
        'vesting': '0x72e844349c2f898b2b45fa312dBB1161c0656B99',
      },
      'AdvisorTON': {
        'token': '',
        'vesting': '0xB0Fc56bDbaF8099bdfA8A4305FCCC3D9BB6bDbdb',
      },
      'BusinessTON': {
        'token': '',
        'vesting': '0xE184c21AA7b18acD02B2f6aD8BEcb949aC3307B1',
      },
      'ReserveTON': {
        'token': '',
        'vesting': '0x98D82450C50F1dAF04B903d68404eBAB3991412a',
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
