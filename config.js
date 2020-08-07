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
    'contractAddress': { 'SeedTON':'0x1C21aA5eFbfB6ff1b0d4960aB4efe166cbF31083', 'PrivateTON':'0x56FA687d99E0792D32A9D2B982e8cBb2CF9840B4', 'StrategicTON':'0xa934466134613Ac72d606e29495ef5c3C751e537', 'MarketingTON':'0xfe93aa4aA51799fE3b08c64f610E0E6Cb94D4097', 'DaoTON':'0xD986CE06E5D28273537424B877ad62A1E8939d0c', 'TeamTON':'0x1E67fA7e35050F03C729950355B7dbDFF6862e7c', 'AdvisorTON':'0x95b0bdC6275F1CF122f2399D718F7374d7Addc18', 'BusinessTON':'0x04d63Dc71B729cc7774621785161EA0EBf21ba1C', 'ReserveTON':'0x6AF55055f0f05150a48fc203C345e0DEe3617Fb0', 'TON':'0xcf30E122eDC1Ff174Dd686F67eEeF0d14e5cC540', 'StepSwapper':'0x30853708c3acB26bEAa898a76C3b9C337399E9a4', 'VestingSwapper':'0x9b843a1987e4a97cC0EDDFD09FaaC2b8a29F8c0e', 'TONVault':'0xBa0801625d898c4CBF345B40F01F7f96de5c4433', 'Burner':'0x0330C682b24ae464D9819D18c577424ABEe5Ffd2' },
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
