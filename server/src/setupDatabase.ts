import mongoose from 'mongoose'

import Logger from 'bunyan'
import { config } from '@root/config'
import { redisConnection } from '@service/redis/redis.connection'

const log: Logger = config.createLogger('setupDatabase')

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Connected to chatty DB')
      })
      .catch((error) => {
        log.error('Failed to connect to db', error)
        redisConnection.connect()
      })
  }
  connect()

  mongoose.connection.on('disconnected', connect)
}
