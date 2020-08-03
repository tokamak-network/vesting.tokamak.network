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
    'contractAddress': { 'SeedTON':'0x32F23C3AD51b4c14e73d236171c56eE62b1ca2D0', 'PrivateTON':'0x049c4302e1313C9728dBB37E4CBe839586Df573c', 'StrategicTON':'0xA78cc2C8e06Cd780d5186AdFD56b405aFB3a7D6C', 'MarketingTON':'0xDA0D971fF0360058d60Ba004FA0b368310EbF1eB', 'DaoTON':'0xC5c443211b813c2cEdb4533d1E7808B2fB53E25c', 'TeamTON':'0x3Eb86b60E5f43577e016E13034C462Ef653966ee', 'AdvisorTON':'0x987E3fdDFd6302D6f48750fE35c901F07C8aA609', 'BusinessTON':'0x7ec6f98f684feeeb4f73118A1062a946Bb50e424', 'ReserveTON':'0x6D2F48D89A8eb5113028D0E5849D249A0C803477', 'TON':'0x3734E35231abE68818996dC07Be6a8889202DEe9', 'StepSwapper':'0x0613a6d6c41B654daF44f41756e467796d7f952D', 'VestingSwapper':'0x67E88360D472174cCF53CC7738A3073b499697c9', 'TONVault':'0x735Ff401Ad7D28Be229513720B86d0Da0fd91aE4', 'Burner':'0x07a43D5D184f8B91D564348Ef97285Be10Cd9358' },
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
