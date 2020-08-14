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
      'SeedTON':'0x03830588Ec03Dd4BbC3B2CF65557043aC3480945',
      'PrivateTON':'0x21C90244D20A4bA178f54FE265a8d051B73f9F21',
      'StrategicTON':'0x6C5Fd0c71a6b695F8553DaE53cBb77c9B27F2219',
      'MarketingTON':'0x702960398A6f6f159adB121e3adb922217A1735f',
      'DaoTON':'0x1572179CaE61014d1fF2AF94B17BA3f46823a3C3',
      'TeamTON':'0x066E9c570b443622Cc646e3359F2040C591dF099',
      'AdvisorTON':'0x08AE73ddEb69c5a8B1CD22242E1E3C523627F53F',
      'BusinessTON':'0x3F856dBb79BE5C290362351E4AABC0e794C5343B',
      'ReserveTON':'0x365C58f15CD9c5650B822F4Ed25d46c149A49C8C',
      'TON':'0x80E31d3A1c2DFc8B82036CCAd191fc3e2ABDeA97',
      'StepSwapper':'0xcC71593b601A4FD165a35D132DA6eD7C03A56F45',
      'VestingSwapper':'0x3f3FA0E63693C2dbA0287FD29154662D0Af41263',
      'TONVault':'0x4EbfC9e104154562002498AFf68b5bB191b647F9',
      'Burner':'',
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
