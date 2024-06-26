import { BigNumber } from 'ethers'
import { NetworkData } from '../typings'

export const networks: Record<number, NetworkData> = {
  1: {
    chainId: 1,
    name: 'Ethereum',
    shortName: 'Ethereum',
    urlName: 'eth',
    nativeCurrency: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      name: 'Eth',
      symbol: 'ETH',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://etherscan.io/',
    rpcURL: 'https://rpc.ankr.com/eth',
    icon: '/eth.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      //
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        // pair w/ USDC on uniswap v2
        stablePair: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
      },
    ],
  },
  4: {
    chainId: 4,
    name: 'Ethereum Rinkeby (testnet)',
    shortName: 'Rinkeby',
    urlName: 'rinkeby',
    nativeCurrency: {
      address: '',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://rinkeby.etherscan.io/',
    rpcURL: 'https://rinkeby.infura.io/v3/cfeb072b8469447e889da944481d5874',
    icon: '/eth.png',
    isTestNet: true,
    supportedLiquidityPairTokens: [],
  },
  25: {
    chainId: 25,
    name: 'Cronos',
    shortName: 'CRO',
    urlName: 'cro',
    nativeCurrency: {
      address: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
      name: 'Cronos',
      symbol: 'CRO',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://cronoscan.com/',
    rpcURL: 'https://evm-cronos.crypto.org/',
    icon: '/cro.svg',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      {
        address: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
        // pair w/ USDC on https://mm.finance/
        stablePair: '0xa68466208F1A3Eb21650320D2520ee8eBA5ba623',
      },
    ],
  },
  56: {
    chainId: 56,
    name: 'Binance Smart Chain',
    shortName: 'BSC',
    urlName: 'bsc',
    nativeCurrency: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://bscscan.com/',
    rpcURL: 'https://bsc-dataseed.binance.org/',
    icon: '/bsc.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      {
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        // pair w/ USDT on pancakeswap
        stablePair: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
      },
    ],
  },
  97: {
    chainId: 97,
    name: 'Binance Smart Chain (testnet)',
    shortName: 'BSC (testnet)',
    urlName: 'bsctest',
    nativeCurrency: {
      address: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://testnet.bscscan.com/',
    rpcURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    icon: '/bsc.png',
    isTestNet: true,
    supportedLiquidityPairTokens: [
      {
        address: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
        // pair w/ USDT on https://pancake.kiemtienonline360.com/
        stablePair: '0xf855e52ecc8b3b795ac289f85f6fd7a99883492b',
      },
    ],
  },
  109: {
    chainId: 109,
    name: 'Shibarium',
    shortName: 'Shibarium',
    urlName: 'shibarium',
    nativeCurrency: {
      address: '0',
      name: '0',
      symbol: '0',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'http://shibariumscan.io/',
    rpcURL: 'https://www.shibrpc.com/',
    icon: '/shibarium.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // 0
      {
        address: '0',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  122: {
    chainId: 122,
    name: 'Fuse',
    shortName: 'Fuse',
    urlName: 'fuse',
    nativeCurrency: {
      address: '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
      name: 'Fuse',
      symbol: 'FUSE',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://explorer.fuse.io/',
    rpcURL: 'https://rpc.fuse.io/',
    icon: '/fuse.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      {
        // WFUSE
        address: '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
        // WFUSE / USDT lp on app.fuse.fi
        stablePair: '0x8a81984D2DF356B49d182910bbB935897450d7e8',
      },
    ],
  },
  123: {
    chainId: 123,
    name: 'Fuse Spark (testnet)',
    shortName: 'Fuse (testnet)',
    urlName: 'fusetest',
    nativeCurrency: {
      address: '-',
      name: 'Spark',
      symbol: 'SPARK',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://explorer.fusespark.io/',
    rpcURL: 'https://rpc.fusespark.io/',
    icon: '/fuse.png',
    isTestNet: true,
    supportedLiquidityPairTokens: [],
  },
  137: {
    chainId: 137,
    name: 'Polygon',
    shortName: 'Polygon',
    urlName: 'polygon',
    nativeCurrency: {
      address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://polygonscan.com/',
    rpcURL: 'https://polygon-rpc.com/',
    icon: '/polygon.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // WMATIC
      {
        address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        // pair w/ USDC on quickswap
        stablePair: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
      },
    ],
  },
  169: {
    chainId: 169,
    name: 'Manta',
    shortName: 'Manta',
    urlName: 'manta',
    nativeCurrency: {
      address: '0x0Dc808adcE2099A9F62AA87D9670745AbA741746',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://pacific-explorer.manta.network/',
    rpcURL: 'https://pacific-rpc.manta.network/http',
    icon: '/manta.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // ETH
      {
        address: '0x0Dc808adcE2099A9F62AA87D9670745AbA741746',
        // pair w/ USDC on Quickswap
        stablePair: '0xb73603C5d87fA094B7314C74ACE2e64D165016fb',
      },
    ],
  },
  196: {
    chainId: 196,
    name: 'X Layer',
    shortName: 'Xlayer',
    urlName: 'xlayer',
    nativeCurrency: {
      address: '0xe538905cf8410324e03a5a23c1c177a474d59b2b',
      name: 'OKB',
      symbol: 'OKB',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://www.okx.com/explorer/xlayer/',
    rpcURL: 'https://rpc.xlayer.tech',
    icon: '/xlayer.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // OKB
      {
        address: '0xe538905cf8410324e03a5a23c1c177a474d59b2b',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  204: {
    chainId: 204,
    name: 'opBNB',
    shortName: 'opBNB',
    urlName: 'opbnb',
    nativeCurrency: {
      address: '0x4200000000000000000000000000000000000006',
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://mainnet.opbnbscan.com/',
    rpcURL: 'https://opbnb-mainnet-rpc.bnbchain.org/',
    icon: '/opBNB.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // BNB
      {
        address: '0x4200000000000000000000000000000000000006',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  314: {
    chainId: 314,
    name: 'Filecoin',
    shortName: 'FVM',
    urlName: 'fvm',
    nativeCurrency: {
      address: '0',
      name: 'Filecoin',
      symbol: 'FIL',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://filfox.info/en/',
    rpcURL: 'https://api.node.glif.io',
    icon: '/fvm.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // FIL
      {
        address: '0',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  369: {
    chainId: 369,
    name: 'PulseChain',
    shortName: 'Pulse',
    urlName: 'pulse',
    nativeCurrency: {
      address: '0xA1077a294dDE1B09bB078844df40758a5D0f9a27',
      name: 'PULSE',
      symbol: 'PLS',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://scan.pulsechain.com/',
    rpcURL: 'https://rpc.pulsechain.com',
    icon: '/pulse.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // PLS
      {
        address: '0xA1077a294dDE1B09bB078844df40758a5D0f9a27',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  588: {
    chainId: 588,
    name: 'Metis Stardust (testnet)',
    shortName: 'Metis',
    urlName: 'metistest',
    nativeCurrency: {
      address: '-',
      name: 'Metis',
      symbol: 'METIS',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://stardust-explorer.metis.io/',
    rpcURL: 'https://stardust.metis.io/?owner=588',
    icon: '/metis.png',
    isTestNet: true,
    supportedLiquidityPairTokens: [],
  },
  592: {
    chainId: 592,
    name: 'Astar',
    shortName: 'Astar',
    urlName: 'astar',
    nativeCurrency: {
      address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      name: 'Astar',
      symbol: 'ASTR',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://blockscout.com/astar/',
    rpcURL: 'https://rpc.astar.network:8545',
    icon: '/astar.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // WAstar
      {
        address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
        // pair w/ USDC on https://www.arthswap.org/
        stablePair: '0xBB1290c1829007F440C771b37718FAbf309cd527',
      },
      {
        address: '0xEcC867DE9F5090F55908Aaa1352950b9eed390cD',
        // pair w/ USDC on https://astar.exchange/
        stablePair: '0xA6E7448463dF706862E424208838047D8Aa0ED11',
      },
    ],
  },
  1030: {
    chainId: 1030,
    name: 'Conflux',
    shortName: 'Conflux',
    urlName: 'conflux',
    nativeCurrency: {
      address: '0x14b2D3bC65e74DAE1030EAFd8ac30c533c976A9b',
      name: 'Conflux',
      symbol: 'CFX',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://www.confluxscan.io/',
    rpcURL: 'https://evm.confluxrpc.com',
    icon: '/conflux.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // CFX
      {
        address: '0x14b2D3bC65e74DAE1030EAFd8ac30c533c976A9b',
        // pair w/ USDT on https://swappi.io/
        stablePair: '0x8fcf9c586d45ce7fcf6d714cb8b6b21a13111e0b',
      },
    ],
  },
  1088: {
    chainId: 1088,
    name: 'Metis Andromeda',
    shortName: 'Metis',
    urlName: 'metis',
    nativeCurrency: {
      address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
      name: 'Metis',
      symbol: 'METIS',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://andromeda-explorer.metis.io/',
    rpcURL: 'https://andromeda.metis.io/?owner=1088',
    icon: '/metis.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // Metis
      {
        address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
        // pair w/ m.USDT on tethys
        stablePair: '0x8121113eB9952086deC3113690Af0538BB5506fd',
      },
      // WMETIS
      {
        address: '0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481',
        // pair w/ m.USDT on standard.tech
        stablePair: '0x6e90e50c8A04824104dB4B456b7EdEa3469d9b5F',
      },
      // // m.USDT
      // {
      //   address: '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC',
      //   // pair w/ Metis on tethys
      //   stablePair: '0x8121113eB9952086deC3113690Af0538BB5506fd',
      // },
      // // m.USDC
      // {
      //   address: '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21',
      //   // pair w/ Metis on tethys
      //   stablePair: '0xDd7dF3522a49e6e1127bf1A1d3bAEa3bc100583B',
      // },
    ],
  },
  2000: {
    chainId: 2000,
    name: 'Dogechain',
    shortName: 'Dogechain',
    urlName: 'dogechain',
    nativeCurrency: {
      address: '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101',
      name: 'Doge',
      symbol: 'DOGE',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://explorer.dogechain.dog/',
    // official dogechain rpc is comically slow.
    // here it is, but tbh don't bother with it.
    // rpcURL: 'https://rpc.dogechain.dog',
    // updated ankr rpc, which actually works.
    rpcURL: 'https://rpc.dogechain.dog',
    icon: '/dogechain.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // DOGE
      {
        address: '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101',
        // pair w/ USDC on https://dogeswap.org/
        stablePair: '0xa8E4040B7085A937b278e7aa95C36e9044CC6D9c',
      },
    ],
  },
  2001: {
    chainId: 2001,
    name: 'Milkomeda',
    shortName: 'Milkomeda',
    urlName: 'milkomeda',
    nativeCurrency: {
      address: '0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9',
      name: 'Wrapped ADA',
      symbol: 'WADA',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com/',
    rpcURL: 'https://rpc-mainnet-cardano-evm.c1.milkomeda.com',
    icon: '/milkomeda.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      //
      {
        address: '0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9',
        stablePair: '0x0B46AD9e9B749c9D500C81a4975B1599a872Ebe8',
      },
    ],
  },
  4200: {
    chainId: 4200,
    name: 'Merlin',
    shortName: 'Merlin',
    urlName: 'merlin',
    nativeCurrency: {
      address: '0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA',
      name: 'Bitcoin',
      symbol: 'BTC',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://scan.merlinchain.io/',
    rpcURL: 'https://rpc.merlinchain.io',
    icon: '/merlin.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // BTC
      {
        address: '0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  5000: {
    chainId: 5000,
    name: 'Mantle',
    shortName: 'mantle',
    urlName: 'mantle',
    nativeCurrency: {
      address: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
      name: 'Mantle',
      symbol: 'MTL',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://explorer.mantle.xyz/',
    rpcURL: 'https://rpc.mantle.xyz/',
    icon: '/mantle.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // MTL
      {
        address: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
        // pair w/ USDT on 0
        stablePair: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE',
      },
    ],
  },
  7000: {
    chainId: 7000,
    name: 'ZetaChain',
    shortName: 'Zeta',
    urlName: 'zeta',
    nativeCurrency: {
      address: '0x5F0b1a82749cb4E2278EC87F8BF6B618dC71a8bf',
      name: 'Zeta',
      symbol: 'ZETA',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://zetachain.blockscout.com/',
    rpcURL: 'https://zetachain-evm.blockpi.network/v1/rpc/public',
    icon: '/zeta.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // ZETA
      {
        address: '0x5F0b1a82749cb4E2278EC87F8BF6B618dC71a8bf',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  7700: {
    chainId: 7700,
    name: 'Canto',
    shortName: 'Canto',
    urlName: 'canto',
    nativeCurrency: {
      address: '0x826551890Dc65655a0Aceca109aB11AbDbD7a07B',
      name: 'CANTO',
      symbol: 'CANTO',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://evm.explorer.canto.io/',
    rpcURL: 'https://jsonrpc.canto.nodestake.top/',
    icon: '/canto.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // CANTO
      {
        address: '0x826551890Dc65655a0Aceca109aB11AbDbD7a07B',
        // pair w/ USDC on cantoswap.fi
        stablePair: '0x628851EF2aAd2ACC4c4dD2E13fdceEBA0e5106bA',
      },
    ],
  },
  8453: {
    chainId: 8453,
    name: 'Base',
    shortName: 'base',
    urlName: 'base',
    nativeCurrency: {
      address: '0x4200000000000000000000000000000000000006',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://basescan.org/',
    rpcURL: 'https://developer-access-mainnet.base.org/',
    icon: '/base.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // ETH
      {
        address: '0x4200000000000000000000000000000000000006',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  12009: {
    chainId: 12009,
    name: 'SatoshiChain',
    shortName: 'satoshichain',
    urlName: 'sats',
    nativeCurrency: {
      address: '0xf340aC507F8E9DD94f26a33B0Ecd8dF9fA85AAf4',
      name: 'Satoshi',
      symbol: 'SATS',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://satoshiscan.io/',
    rpcURL: 'https://mainnet-rpc.satoshichain.io/',
    icon: '/sats.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // SatoshiChain
      {
        address: '0xf340aC507F8E9DD94f26a33B0Ecd8dF9fA85AAf4',
        stablePair: '',
      },
    ],
  },
  42161: {
    chainId: 42161,
    name: 'Arbitrum',
    shortName: 'Arbitrum',
    urlName: 'arbitrum',
    nativeCurrency: {
      address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://arbiscan.io/',
    rpcURL: 'https://arb1.arbitrum.io/rpc',
    icon: '/arbitrum.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // ETH
      {
        address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        // pair w/ USDT on https://app.sushi.com/
        stablePair: '0xCB0E5bFa72bBb4d16AB5aA0c60601c438F04b4ad',
      },
    ],
  },
  10001: {
    chainId: 10001,
    name: 'EthereumPoW',
    shortName: 'EthW',
    urlName: 'ethw',
    nativeCurrency: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      name: 'ETHW-mainnet',
      symbol: 'ETHW',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://www.oklink.com/en/ethw/',
    rpcURL: 'https://mainnet.ethereumpow.org',
    icon: '/ethw.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // ETHW
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        // pair w/ 0 on 0
        stablePair: '',
      },
    ],
  },
  43114: {
    chainId: 43114,
    name: 'Avalanche',
    shortName: 'AVAX',
    urlName: 'avax',
    nativeCurrency: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://snowtrace.io/',
    rpcURL: 'https://api.avax.network/ext/bc/C/rpc',
    icon: '/avax.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      //
      {
        address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        // pair w/ USDC.e on https://traderjoexyz.com/home#/
        stablePair: '0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1',
      },
    ],
  },
  59144: {
    chainId: 59144,
    name: 'Linea',
    shortName: 'linea',
    urlName: 'linea',
    nativeCurrency: {
      address: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://lineascan.build/',
    rpcURL: 'https://rpc.linea.build',
    icon: '/linea.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      //
      {
        address: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
        // pair w/ BUSD on Horizon Dex
        stablePair: '0x7d43AABC515C356145049227CeE54B608342c0ad',
      },
    ],
  },
  80001: {
    chainId: 43114,
    name: 'Polygon Mumbai (testnet)',
    shortName: 'Mumbai',
    urlName: 'mumbai',
    nativeCurrency: {
      address: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://mumbai.polygonscan.com/',
    rpcURL: 'https://rpc-mumbai.maticvigil.com/',
    icon: '/polygon.png',
    isTestNet: true,
    supportedLiquidityPairTokens: [
      {
        address: '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
        // pair w/ dai on https://legacy.quickswap.exchange/
        stablePair: '0xc0ec4271d306f0ea4a70298c0243ea59a58bfd7f',
      },
    ],
  },
  81457: {
    chainId: 81457,
    name: 'Blast',
    shortName: 'Blast',
    urlName: 'blast',
    nativeCurrency: {
      address: '0x4300000000000000000000000000000000000004',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://blastscan.io/',
    rpcURL: 'https://blast.blockpi.network/v1/rpc/public',
    icon: '/blast.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // ETH
      {
        address: '0x4300000000000000000000000000000000000004',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  420420: {
    chainId: 420420,
    name: 'KeKchain',
    shortName: 'KekChain',
    urlName: 'kekchain',
    nativeCurrency: {
      address: '0x54Bd9D8d758AC3717B37b7DC726877a23afF1B89',
      name: 'KeK',
      symbol: 'KEK',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://mainnet-explorer.kekchain.com/',
    rpcURL: 'https://mainnet.kekchain.com',
    icon: '/kekchain.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // Kek
      {
        address: '0x54Bd9D8d758AC3717B37b7DC726877a23afF1B89',
        // pair w/  on
        stablePair: '',
      },
    ],
  },
  420666: {
    chainId: 420666,
    name: 'KeKchain Testnet (testnet)',
    shortName: 'KeKchain',
    urlName: 'kektest',
    nativeCurrency: {
      address: '0xA888a7A2dc73efdb5705106a216f068e939A2693',
      name: 'KeK',
      symbol: 'KEK',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://testnet-explorer.kekchain.com/',
    rpcURL: 'https://testnet.kekchain.com',
    icon: '/kekchain.png',
    isTestNet: true,
    supportedLiquidityPairTokens: [
      // Kek
      {
        address: '0xA888a7A2dc73efdb5705106a216f068e939A2693',
        // pair w/  on
        stablePair: '',
      },
    ],
  },
  534352: {
    chainId: 534352,
    name: 'Scroll',
    shortName: 'Scroll',
    urlName: 'scroll',
    nativeCurrency: {
      address: '0x5300000000000000000000000000000000000004',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://blockscout.scroll.io/',
    rpcURL: 'https://rpc.scroll.io/',
    icon: '/scroll.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // ETH
      {
        address: '0x5300000000000000000000000000000000000004',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  7777777: {
    chainId: 7777777,
    name: 'Zora',
    shortName: 'Zora',
    urlName: 'zora',
    nativeCurrency: {
      address: '0',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://explorer.zora.energy/',
    rpcURL: 'https://rpc.zora.energy',
    icon: '/zora.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // ETH
      {
        address: '0',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  666666666: {
    chainId: 666666666,
    name: 'Degen',
    shortName: 'Degen',
    urlName: 'degen',
    nativeCurrency: {
      address: '0xEb54dACB4C2ccb64F8074eceEa33b5eBb38E5387',
      name: 'Degen',
      symbol: 'degen',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://explorer.degen.tips/',
    rpcURL: 'https://rpc.degen.tips',
    icon: '/degen.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // degen
      {
        address: '0xEb54dACB4C2ccb64F8074eceEa33b5eBb38E5387',
        // pair w/ 0 on 0
        stablePair: '0',
      },
    ],
  },
  20202021: {
    chainId: 20202021,
    name: 'Poochain',
    shortName: 'Poop',
    urlName: 'poochain',
    nativeCurrency: {
      address: '0x28e8E40abD4C51817a2Fae589257fA48F115Bc36',
      name: 'Poochain',
      symbol: 'POOP',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://www.pooscan.co/',
    rpcURL: 'https://mainnet.poochain.co/rpc',
    icon: '/poochain.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // POOP
      {
        address: '0x28e8E40abD4C51817a2Fae589257fA48F115Bc36',
        // pair w/ 0 on https://pooswap.finance/swap
        stablePair: '0',
      },
    ],
  },
  245022934: {
    chainId: 245022934,
    name: 'Neon',
    shortName: 'Neon',
    urlName: 'neon',
    nativeCurrency: {
      address: '0x202c35e517fa803b537565c40f0a6965d7204609',
      name: 'Neon',
      symbol: 'NEON',
      decimals: 18,
      balance: BigNumber.from(0),
    },
    explorerURL: 'https://neonscan.org/',
    rpcURL: 'https://neon-proxy-mainnet.solana.p2p.org',
    icon: '/neon.png',
    isTestNet: false,
    supportedLiquidityPairTokens: [
      // NEON
      {
        address: '0x202c35e517fa803b537565c40f0a6965d7204609',
        // pair w/ USDC on MoraSwap
        stablePair: '0xea6b04272f9f62f997f666f07d3a974134f7ffb9',
      },
    ],
  },
}

export default function getNetworkDataByChainId(chainId: number): NetworkData | undefined {
  return networks[chainId]
}
