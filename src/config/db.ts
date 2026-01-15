import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "./env"
import { User } from "@entities/user.entity"
import { Product } from "@entities/product.entity"
import logger from "./logger"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.database.synchronize,
  logging: config.database.logging,
  entities: [User, Product],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
})

export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
      logger.info("Database connection established successfully")
    }
  } catch (error) {
    logger.error(`Database connection failed: ${error}`)
    process.exit(1)
  }
}
