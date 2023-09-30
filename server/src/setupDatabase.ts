import mongoose from "mongoose"
import {config} from './config'
import Logger from 'bunyan'

const log: Logger = config.createLogger('setupDatabase')

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info("Connected to chatty DB");
      })
      .catch((error) => {
        log.error("Failed to connect to db", error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect)
};
