const config = {
  'mainnet': {
    'baseURL': 'https://dashboard-api.tokamak.network',
    'prefixTransactionHash': 'https://etherscan.io/tx/',
    'prefixAddress': 'https://etherscan.io/address/',
    'network': '1',
    'contractAddress': {
      'SeedTON':'0x6c1E75Ce98f67e15587388f633D8C7Ae8F2C399f',
      'PrivateTON':'0xA4Eac2a2EafF4a43E31B336406a6d618725032CC',
      'StrategicTON':'0x9aB783ADC9958f578CB4b126187592e2D9072a2D',
      'MarketingTON':'0xe3a87a9343D262F5f11280058ae807B45aa34669',
      'DaoTON':'0x08368cF6c32f5ca0aC80F7bc9da768fc775E9CD7',
      'TeamTON':'0x07599893969F5a4851d149ED14DbEBa886811aFB',
      'AdvisorTON':'0x7c65182DD2eC55D3D91d16e2e69EEbe251A5f1a2',
      'BusinessTON':'0x774bb5875072DEA0A41F8D4ea90adc36270Cc98e',
      'ReserveTON':'0xd1F04aaD6582f6034f4e5709F2C09b147f3376c5',
      'TON':'0x2be5e8c109e2197D077D13A82dAead6a9b3433C5',
      'StepSwapper':'0x8DB1fdfDa8D1024f8a5B5dCed5eC1918435F2fc8',
      'VestingSwapper':'0x25c31C6f764c11fbe62B72e83a149771d6D70A61',
      'TONVault':'0xf68C26aA86607C64b6a86dC2A987530eFd3ae941',
      'Burner':'',
    },
  },
  'rinkeby': {
    'baseURL': 'https://dashboard-api.tokamak.network/rinkeby',
    'prefixTransactionHash': 'https://rinkeby.etherscan.io/tx/',
    'prefixAddress': 'https://rinkeby.etherscan.io/address/',
    'network': '4',
    'contractAddress': {
      'SeedTON':'0x1C21aA5eFbfB6ff1b0d4960aB4efe166cbF31083',
      'PrivateTON':'0x56FA687d99E0792D32A9D2B982e8cBb2CF9840B4',
      'StrategicTON':'0xa934466134613Ac72d606e29495ef5c3C751e537',
      'MarketingTON':'0xfe93aa4aA51799fE3b08c64f610E0E6Cb94D4097',
      'DaoTON':'0xD986CE06E5D28273537424B877ad62A1E8939d0c',
      'TeamTON':'0x1E67fA7e35050F03C729950355B7dbDFF6862e7c',
      'AdvisorTON':'0x95b0bdC6275F1CF122f2399D718F7374d7Addc18',
      'BusinessTON':'0x04d63Dc71B729cc7774621785161EA0EBf21ba1C',
      'ReserveTON':'0x6AF55055f0f05150a48fc203C345e0DEe3617Fb0',
      'TON':'0xcf30E122eDC1Ff174Dd686F67eEeF0d14e5cC540',
      'StepSwapper':'0x30853708c3acB26bEAa898a76C3b9C337399E9a4',
      'VestingSwapper':'0x9b843a1987e4a97cC0EDDFD09FaaC2b8a29F8c0e',
      'TONVault':'0xBa0801625d898c4CBF345B40F01F7f96de5c4433',
      'Burner':'0x0330C682b24ae464D9819D18c577424ABEe5Ffd2',
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
