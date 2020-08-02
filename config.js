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
    'contractAddress': { 'SeedTON':'0x83EEa3Df225d01e7643909bB168a6D851e24146a', 'PrivateTON':'0x7Da6e034B0c59932AF021E33d37D7e9E3D610ea0', 'StrategicTON':'0x1F5efec43FbcaE025dbA5789B43dBBf39FA4896B', 'MarketingTON':'0x5368F12e503ED967Dc96C30D6e8466F7850dBcE0', 'DaoTON':'0x1A272758FE9e0EDB5A477D93E6715637e73d47Ae', 'TeamTON':'0xB4Bf5F93c8E9a39F96065Ee1d2424E2977D0833a', 'AdvisorTON':'0x1A4B0BACB362618AABB3d59651C4d527D773bD1b', 'BusinessTON':'0x27E61B90e29d10daC1C5525515C2e4B4bDBd5bD6', 'ReserveTON':'0x73B632575aF651523832F54f1307b9865D975AE6', 'TON':'0xDA2b723cA54223777455Fa8510f1F4d147E523e8', 'StepSwapper':'0xA750B552721cc9C220f835eB6DEB3C9d3Be8Fc73', 'VestingSwapper':'0x57085A67e06f8fF8FaB94FFEEBd587FBd50023A7', 'TONVault':'0xdd35517100AE990dBa06e3B5057E7D2C4F2362F7', 'Burner':'0xf3Cf75A9816Bc5FA26E585A6c90Bc7D0ff035148' },
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
