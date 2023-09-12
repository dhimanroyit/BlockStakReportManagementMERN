import 'dotenv/config';

const {
  NODE_ENV,
  PORT,
  LOCAL_DATABASE_URL,
  REMOTE_DATABASE_URL,
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
} = process.env;

const config = {
  port: PORT,
  databaseUrl:
    NODE_ENV === 'development' ? LOCAL_DATABASE_URL : REMOTE_DATABASE_URL,
  jwtAccessSecretKey: JWT_ACCESS_SECRET_KEY,
  jwtRefreshSecretKey: JWT_REFRESH_SECRET_KEY,
};

export default config;
