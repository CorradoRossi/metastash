export const SITE_URL = 'https://metastash.xyz';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = '@metastash';
export const TITLE = 'Metastash';
export const SITE_NAME = 'Metastash';
export const BRAND_NAME = 'Metastash';
export const META_DESCRIPTION = 'Metastash';
export const SITE_DESCRIPTION = 'Metastash';
export const TWEET_TEXT = 'Welcome to Metastash';
export const SITE_NAME_MULTILINE = ['Meta', 'Stash'];
export const COOKIE = 'user-id';
export const DEFAULT_ERROR_MSG = 'Error! Please try again.';

export const DEFAULT_PROFILE_PIC =
  'https://storage.googleapis.com/opensea-static/opensea-profile/4.png';

// Number of seconds to cache the API response for
export const EXPIRES_SECONDS = 5;
export const SAMPLE_TICKET_NUMBER = 1234;
export const RSSI_WALLET = '0x90c19feA1eF7BEBA9274217431F148094795B074';
export const CODE_OF_CONDUCT = 'https://metastash.xyz';
export const REPO = 'https://github.com/CorradoRossi/Metastash';

export const UNIQUE_TOKENS_LIMIT_PER_PAGE = 50;
export const UNIQUE_TOKENS_LIMIT_TOTAL = 2000;

export const META = {
  title: TITLE,
  description: META_DESCRIPTION
};

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const INFURA_ID = '72414aceffb245f7bd17f6239ce4a5d7';
export const NETWORK_NAME = 'mainnet';

export const OPENSEA_BASE_URL = 'https://api.opensea.io/api/v1/';
export const OPENSEA_ASSETS = 'assets';
export const OPENSEA_ASSET = 'asset'; //asset_contract_address/token_id/
export const OPENSEA_EVENTS = 'events';
export const OPENSEA_CONTRACT = 'asset_contract';
export const OPENSEA_COLLECTIONS = 'collections';

export const API_URL = 'https://graphql.datocms.com/';
export const API_URL_DRAFT = 'https://graphql.datocms.com/preview';
export const API_REST_ENDPOINT = 'https://site-api.datocms.com/';
export const API_TOKEN_READ = '6e37e962aaf5d60e9e1b3ce1dac08d';
export const API_TOKEN_FULL = '9a86934493e273cb21af51fb40aa2f';
export const API_TOKEN = process.env.DATOCMS_FULL_API_TOKEN;

export const NAVIGATION = [
  {
    name: 'Profile',
    route: '/#/'
  },
  {
    name: 'Collection',
    route: '/collection'
  },
  {
    name: 'Links',
    route: '/market'
  },
  {
    name: 'Profile',
    route: '/platform/one'
  },
  {
    name: 'Wallet',
    route: '/wallet'
  }
];

//export const NAVIGATION = [
//  {
//    name: 'Links',
//    route: '/market'
//  },
//  {
//    name: 'Profile',
//    route: '/platform/one'
//  },
//  {
//    name: 'Collection',
//    route: '/collection'
//  },
//  {
//    name: 'Market',
//    route: '/market'
//  },
//  {
//    name: 'Wallet',
//    route: '/wallet'
//  },
//  {
//    name: 'Settings',
//    route: '/settings'
//  }
//];

export const DEFAULT_USER = {
  id: undefined,
  address: undefined,
  name: undefined,
  username: undefined,
  discord: undefined,
  avatar: undefined,
  avatar_url: undefined,
  bio: undefined,
  twitter: undefined,
  github: undefined,
  title: undefined
};

export const CONTRACTS = {
  ZORA: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
  RARIBLE_V2: '0x60f80121c31a0d46b5279700f9df786054aa5ee5',
  RARIBLE_1155: '0xd07dc4262bcdbf85190c01c996b4c06a461d2430',
  KNOWNORIGIN: '0xfbeef911dc5821886e1dda71586d90ed28174b7d',
  FOUNDATION: '0x3b3ee1931dc30c1957379fac9aba94d1c48a5405',
  SUPERRARE_V1: '0x41a322b28d0ff354040e2cbc676f0320d8c8850d',
  SUPERRARE_V2: '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0',
  ASYNCART_V1: '0x6c424c25e9f1fff9642cb5b7750b0db7312c29ad',
  ASYNCART_V2: '0xb6dae651468e9593e4581705a09c10a76ac1e0c8',
  CRYPTOARTAI: '0x3ad503084f1bd8d15a7f5ebe7a038c064e1e3fa1',
  PORTIONIO: '0xda98f59e1edecb2545d7b07b794e704ed6cf1f7a',
  PORTIONIO_1155: '0x0adf0bc748296bcba9f394d783a5f5e9406d6874',
  MINTABLE: '0x8c5acf6dbd24c66e6fd44d4a4c3d7a2d955aaad2', // Gasless store
  EPHIMERA: '0xfe21b0a8df3308c61cb13df57ae5962c567a668a'
};

export const ACTIVITY_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  SELL: 'sell',
  BUY: 'buy',
  CREATE: 'create',
  FOLLOW: 'follow',
  SEND: 'send',
  RECEIVE: 'receive'
};

// NFTs Contracts
export const ENS_NFT_CONTRACT_ADDRESS = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85';
export const UNIV3_NFT_CONTRACT_ADDRESS = '0xc36442b4a4522e871399cd717abdd847ab11fe88';
