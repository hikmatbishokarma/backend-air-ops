import { Config } from './config.interface';

const config: any = {
  cors: { enable: true },
  mongo: {
    uri: process.env.MONGODB_URI,
  },
  server: {
    port: Number(process.env.PORT),
  },
};
export default (): Config => config;
