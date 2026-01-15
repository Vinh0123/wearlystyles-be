import { Router } from "express"
import authRoutes from "@modules/auth/auth.route"
import userRoutes from "@modules/user/user.route"
import productRoutes from "@modules/product/product.route"

const router = Router()

// v2 routes - can have different implementations
router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/products", productRoutes)

export default router
