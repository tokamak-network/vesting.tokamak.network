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
      'TON':'0xBbCD419027794e6eF51d49b3ee5f59624dc9ACd6',
      'VestingSwapper':'0x0083121623cA67D9C6B8C2EBbdb2A455dcC8D2B0',
      'StepSwapper':'0x75ec01f4DBDe6C9F7f5C5156A181431b32987c76',
      'TONVault':'0xC1406e60C333a93ffe7465A3c5B045068f19d208',
      'StrategicTON': {
        'token': '',
        'vesting': '0x3e322Fc1496faf350c630E954A745432Fb778D45',
      },
      'PrivateTON': {
        'token': '',
        'vesting': '0x27b992F0c8102B84Afde16C0a6c570E2822ADaAd',
      },
      'SeedTON': {
        'token': '',
        'vesting': '0xE24E82471bD0AC6E9Bf5E982FED5482d9762dE3c',
      },
      'MarketingTON': {
        'token': '',
        'vesting': '0x84019083657ddb2b3EE3002Ae873569D015B9692',
      },
      'DaoTON': {
        'token': '',
        'vesting': '0x7A2f2E6E7f1c3F20c670a8518f60D87A8F179143',
      },
      'TeamTON': {
        'token': '',
        'vesting': '0xa983340529f8cc75fEdC6dACf8339390E4E2C19B',
      },
      'AdvisorTON': {
        'token': '',
        'vesting': '0xE3c0C4188DEC8335691f0c9a80a0AFB64cc89E81',
      },
      'BusinessTON': {
        'token': '',
        'vesting': '0x81D9cF120ADEAfbcc55a0197b7e19631B346535B',
      },
      'ReserveTON': {
        'token': '',
        'vesting': '0x774e2Cfd87ba9865a3d1a68650d01E17F6602878',
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
