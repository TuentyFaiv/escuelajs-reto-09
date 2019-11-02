// const { productsMock } = require('../utils/mocks');

const MongoLib = require('../lib/mongo');

class ProductService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product }) {
    const createProductId = await this.mongoDB.create(this.collection, product);
    return createProductId || [];
  }

  async updateProduct({ productId, product } = {}) {
    const updateMovieId = await this.mongoDB.update(
      this.collection,
      productId,
      product
    );

    return updateMovieId;
  }

  async deleteProduct({ productId }) {
    const deleteProductId = await this.mongoDB.delete(this.collection, productId);
    return deleteProductId;
  }
}

module.exports = ProductService;
