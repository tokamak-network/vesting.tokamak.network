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
      'TON':'0x7795db0bB6B0E5C57981BC68d3F1c128012E5200',
      'VestingSwapper':'0x73A137302D950bF04Df6CaA1579b40250AD27C12',
      'StepSwapper':'0x9D66FB17Aa2D5E76063D0aBaB2563E5508E1419a',
      'TONVault':'0x78F7e40af489B87E47cEBa9d2Af73dc8Bc04D667',
      'Burner': '0xd6e1cc7D36D5B126d3Fe328199243A017735a298',
      'StrategicTON':'0x5eBCb8c61d35C1815B32F42f98Bc89220572141A',
      'PrivateTON': '0x9d238606aD12dE4ACC5389e73be32E96BeFaEf1e',
      'SeedTON': '0x0ecF8d58D3B3Ac3cca3765AF91acb3349E12110c',
      'MarketingTON': '0x6CB5B73C8b5fAb8cF72A382E171A5e31C3F527cc',
      'DaoTON': '0xaCd88d9F2DaD0934bDC6133c6173FFf69593920F',
      'TeamTON': '0xeAcbADa430aEFFc9c1FcAd0153C538806EEa5B2f',
      'AdvisorTON': '0xe2C82e2e6934F1ec23CC98eDA3DC767de96ac71D',
      'BusinessTON': '0xd9d2Ea1fF133D9b3250067c812204EA8aF759598',
      'ReserveTON': '0xbbe374d22C3AcB4aF80aB1c4e2bEB001E8b4c8Ae',
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
