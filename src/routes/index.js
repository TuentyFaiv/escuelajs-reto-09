const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    const { tags } = req.query;
    const storeProducts = await productService.getProducts({ tags });
    res.status(200).json({
      data: storeProducts,
      message: 'products listed'
    });
  });

  router.get('/products/:productId', async (req, res, next) => {
    const { productId } = req.params;

    const product = await productService.getProduct({ productId });
    res.status(200).json({
      data: product,
      message: 'product listed'
    });
  });

  router.post('/products/new', async (req, res, next) => {
    const { body: product } = req;

    const createProductId = await productService.createProduct({ product });
    res.status(201).json({
      data: createProductId,
      message: 'product created'
    });
  });

  router.put('/products/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;

    const updatedProductId = await productService.updateProduct({
      productId,
      product
    });
    res.status(200).json({
      data: updatedProductId,
      message: 'product updated'
    });
  });

  router.delete('/products/:productId', async (req, res, next) => {
    const { productId } = req.params;

    const deletedProduct = await productService.deleteProduct({ productId });
    res.status(200).json({
      data: deletedProduct,
      message: 'product deleted'
    });
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;