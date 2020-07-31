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
      'SeedTON':'0x8004637c90A4Af414cf525A6cC4cD8f726D6BEA7',
      'PrivateTON':'0xa7C65a0eb6112994448282363d8740450316b425',
      'StrategicTON':'0x985eD94019714f249A2a949ff05E6f98f6b71698',
      'MarketingTON':'0x5a7C7ABe591C74f97Bcb5d3FaFE29737b60B78DD',
      'DaoTON':'0x91a710a29Ee9D05178E7CCb9511C51140a869253',
      'TeamTON':'0x92f6D2FA2252163113c09458276F8Ffd73C89bad',
      'AdvisorTON':'0xc5d8fe1FB003aCDD8F812B5c0c51F9732935203f',
      'BusinessTON':'0x7B05b262F2f282d8e174BeBd169d7b30FA510B46',
      'ReserveTON':'0xd47dA7ED5b403Da0bC8eA6D80f4E154846B917d4',
      'TON':'0x54980dd451DE2B831011500ec0a660eE5BD5553d',
      'StepSwapper':'0xA32058EB5a9DE7cBb72567B53DA97aB2fE284bF9',
      'VestingSwapper':'0x83DB319DEb6D1093F673A55e5a4a49CB89C145f6',
      'TONVault':'0xb80e89100ABC9F94Fec9Fd9C5A464019e1Ec8a62',
      'Burner':'0xEA5D0a19944CeE3fFe5711f95D0Bae1bE04bE570',
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
