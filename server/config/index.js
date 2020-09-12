/* IMPORTS */
const dotenv = require('dotenv');

/* SET THE NODE_ENV TO 'DEVELOPMENT' BY DEFAULT */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/* CHECKS FOR 'DOTENV' FILE */
const dotEnv = dotenv.config();
if (dotEnv.error) {
  throw new Error('.env file not found!');
};

// MONGODB OPTIONS
const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

/* EXPORTS */
module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  port: process.env.PORT,
  db: {
    uri: process.env.MONGODB_URI,
    options: options,
  },
  api: {
    prefix: '/api',
  },
  uri: process.env.URI,
  firebase: {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    storageBucketUrl: process.env.FIREBASE_STORAGE_BUCKET_URL,
  },
  stripe: {
    test_key: process.env.STRIPE_TEST_KEY,
    secret_key: process.env.STRIPE_SECRET_KEY,
  },
};