import express from 'express'
const ProductRouter = express.Router()

ProductRouter.get('/', (req, res) => {
  res.send("Hi, i'm goku in Product!")
})

export default ProductRouter
