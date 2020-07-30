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
      'TON':'0x60EABE932Cbd2633C2227bB1d3589cA654aB620E',
      'VestingSwapper':'0xCdABC7A387877bDB14B429Fb826e9c7E1c8E4178',
      'StepSwapper':'0xF261d11AbAaE437Da6fa63Ea7b8eEa4E63Bd345f',
      'TONVault':'0x49815A7fF98cbf5aA48F862131B17eB67557dB70',
      'Burner': '0xd6e1cc7D36D5B126d3Fe328199243A017735a298',
      'StrategicTON': {
        'token': '',
        'vesting': '0x1501aD8eff2dC2E2c6F8E716301bC31b7746E54A',
      },
      'PrivateTON': {
        'token': '',
        'vesting': '0xe189F9A3F21917bC5ED5F8007681e8f1C22bd141',
      },
      'SeedTON': {
        'token': '',
        'vesting': '0x3E924Ee43a2EF2DAB8e80C65feAF65f23cc37765',
      },
      'MarketingTON': {
        'token': '',
        'vesting': '0x9dd79Ea49Afc5fB7F08e26De925af265e7CC7Fbe',
      },
      'DaoTON': {
        'token': '',
        'vesting': '0x023E004bc0CF45541a22CEf967e739Eb9Eb0978F',
      },
      'TeamTON': {
        'token': '',
        'vesting': '0x3A1Bea3a33170b5C06c8318431A792F3404E40B6',
      },
      'AdvisorTON': {
        'token': '',
        'vesting': '0xC6137d5e7D4fc402c3f16CAf90630160Ab4804f5',
      },
      'BusinessTON': {
        'token': '',
        'vesting': '0xcb21147595B6e24aa07C53cFea1B933cDA3f4dA8',
      },
      'ReserveTON': {
        'token': '',
        'vesting': '0xC9D724826b84C165B4403537D1f63288EE649bEF',
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
