// a way to save all the environment variables in one place
// and use them in the app
import * as dotenv from 'dotenv';
import { NODE_ENVIRONMENTS } from './constants';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || NODE_ENVIRONMENTS.DEVELOPMENT;
const isProduction = NODE_ENV === 'production';
// const DB_HOST = isProduction ? process.env.DB_HOST_PROD : process.env.DB_HOST;
// const DB_USER = isProduction ? process.env.DB_USER_PROD : process.env.DB_USER;
// const DB_PASSWORD = isProduction
//   ? process.env.DB_PASSWORD_PROD
//   : process.env.DB_PASSWORD;
// const DB_NAME = isProduction ? process.env.DB_NAME_PROD : process.env.DB_NAME;
// const DB_PORT = isProduction ? process.env.DB_PORT_PROD : process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const databaseUrl =
  process.env.DATABASE_URL ||
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const envVariables = {
  apiVersion: process.env.API_VERSION || 'v1',
  port: process.env.PORT || 3000,
  db: {
    host: DB_HOST || 'db',
    port: parseInt(DB_PORT, 10) || 5432,
    password: DB_PASSWORD || 'postgres',
    databaseName: DB_NAME || 'postgres',
    username: DB_USER || 'postgres',
    databaseUrl,
  },
  nodeEnviroment: NODE_ENV,
  isProduction,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  huggingFaceApiKey: process.env.HUGGINGFACE_API_KEY,
  cloudflare: {
    apiKey: process.env.CLOUDFLARE_API_KEY,
    s3AccessKeyId: process.env.CLOUDFLARE_S3_ACCESS_KEY_ID,
    s3SecretAccessKey: process.env.CLOUDFLARE_S3_SECRET_ACCESS_KEY,
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    s3BucketName: process.env.CLOUDFLARE_S3_BUCKET_NAME,
  },
};

export default envVariables;
