import "reflect-metadata"
import { AppDataSource } from "@config/db"
import { User } from "@entities/user.entity"
import { Product } from "@entities/product.entity"
import { hash } from "@utils/hash.util"
import logger from "@config/logger"

const seedDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }

    const userRepository = AppDataSource.getRepository(User)
    const productRepository = AppDataSource.getRepository(Product)

    // Check if admin user already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: "admin@wearly.com" },
    })

    if (!existingAdmin) {
      const adminUser = userRepository.create({
        email: "admin@wearly.com",
        password: await hash("Admin@123"),
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        isActive: true,
      })
      await userRepository.save(adminUser)
      logger.info("Admin user created successfully")
    } else {
      logger.info("Admin user already exists")
    }

    // Seed sample products
    const existingProducts = await productRepository.count()
    if (existingProducts === 0) {
      const products = [
        {
          name: "Classic T-Shirt",
          description: "Premium cotton t-shirt",
          price: 29.99,
          stock: 100,
        },
        {
          name: "Denim Jeans",
          description: "Comfortable blue denim jeans",
          price: 59.99,
          stock: 50,
        },
        {
          name: "Casual Jacket",
          description: "Lightweight casual jacket",
          price: 89.99,
          stock: 30,
        },
      ]

      for (const productData of products) {
        const product = productRepository.create(productData)
        await productRepository.save(product)
      }
      logger.info("Sample products created successfully")
    } else {
      logger.info("Products already exist in database")
    }

    logger.info("Database seeding completed successfully")
  } catch (error) {
    logger.error(`Database seeding failed: ${error}`)
    process.exit(1)
  }
}

seedDatabase()
