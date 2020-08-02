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
      'SeedTON':'0xA6C308e13Eb60a2088365D40E794fE66CE54949f',
      'PrivateTON':'0xFBfb10bEDc426ef51443ce5eb039eAEF25c50ff4',
      'StrategicTON':'0xa5AcaB6a4Fc484Dc6493019E583083ce54Ca71E6',
      'MarketingTON':'0x9aFB20518385a0aB5eB7915Efc69A9A473589F04',
      'DaoTON':'0xBAfC30c70236cea813bf0e2f362C369CAB03fC0B',
      'TeamTON':'0x264dF3b8bA2D110A5Ad86a27f377625482D2b994',
      'AdvisorTON':'0xcd81Dc79eC8a8dCe4B129B6fdcE9B4631430eB9B',
      'BusinessTON':'0x95c3980a7D8401F0554F1A285c50A193F4bA7DA0',
      'ReserveTON':'0xD624A1ccE0e2aCfa1386CACB8F486416D28516AD',
      'TON':'0x933dabE82B143Cd232F0a98bBBd1D52834000Fb2',
      'StepSwapper':'0x17Ad72EefBf6c740E3c442552Ce49Db35ab16A1f',
      'VestingSwapper':'0xE6386b2e8373e8E1DF1783ADBD5844f1aEC4579d',
      'TONVault':'0xe91B7403C4BD57EAa1B9D9743740c306CdBB648E',
      'Burner':'0xc1BB36A86FbFE7A0F5EF38450C0Eb3e3b370196E',
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
