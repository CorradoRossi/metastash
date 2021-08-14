const withImages = require('next-images');

module.exports = withImages({
  images: {
    domains: [
      'www.datocms-assets.com',
      'api.opensea.io',
      'lh3.googleusercontent.com',
      'storage.googleapis.com',
      'localhost'
    ],
    imageSizes: [24, 64, 300]
  },
  env: {
    RPC_URL_1: 'https://mainnet.infura.io/v3/72414aceffb245f7bd17f6239ce4a5d7',
    RPC_URL_4: 'https://rinkeby.infura.io/v3/72414aceffb245f7bd17f6239ce4a5d7',
    DATOCMS_READ_ONLY_API_TOKEN: '6e37e962aaf5d60e9e1b3ce1dac08d',
    DATOCMS_FULL_API_TOKEN: '9a86934493e273cb21af51fb40aa2f',
    NEXT_PUBLIC_PRIVACY_POLICY_URL: 'https://metastash.xyz/privacy',
    NEXT_PUBLIC_COPYRIGHT_HOLDER: 'https://metastash.xyz/copyright',
    NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID: '',
    GITHUB_OAUTH_CLIENT_SECRET: '',
    REDIS_PORT: '',
    REDIS_URL: '',
    REDIS_PASSWORD: '',
    REDIS_SSL_ENABLED: '',
    REDIS_EMAIL_TO_ID_SECRET: '',
    INFURA_SECRET: '26a655e88fe741cc95a9848cdaf309ee',
    SENTRY_DSN: 'https://6296b94f1426454f82a492d2a56b82dd@o804754.ingest.sentry.io/5803099',
    NEXT_PUBLIC_SENTRY_DSN:
      'https://6296b94f1426454f82a492d2a56b82dd@o804754.ingest.sentry.io/5803099'
  }
});
