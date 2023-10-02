import express, { Express } from 'express'
import databaseConnection from '@root/setupDatabase'
import { SocialServer } from '@root/setupServer'
import { config } from '@root/config'

class Application {
  public initialize(): void {
    this.loadConfig()
    databaseConnection()
    const app: Express = express()
    const server: SocialServer = new SocialServer(app)
    server.start()
  }

  private loadConfig(): void {
    config.validateConfig()
    config.cloudinaryConfig()
  }
}

const application: Application = new Application()
application.initialize()
