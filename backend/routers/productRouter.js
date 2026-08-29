import express from 'express'

import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductById,

} from '../controllers/productController.js'

const router = express.Router()

//route to create product

router.post('/add', createProduct)

//route to get all products

router.get('/', getProducts)

//route to update product by Id

router.put('/update/:id', updateProduct)

//route to delete a product by id

router.delete('/delete/:id', deleteProduct)

//route to get product by id

router.get('/:id', getProductById)

export default router

