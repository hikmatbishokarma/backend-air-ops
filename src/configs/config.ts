import multer from 'multer';
import { Config } from './config.interface';

const config: any = {
  cors: { enable: true },
  mongo: {
    uri: process.env.MONGODB_URI,
  },
  server: {
    port: Number(process.env.PORT),
  },
  multer_dest: {
    dest: process.env.MULTER_DEST,
  },
};
export default (): Config => config;
