const Product = require("../models/ProductModel");

const resolvers = {
  Query: {
    products: async () => {
      try {
        return await Product.find().select("name price stock imgUrl");
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
      }
    },
  },
};

module.exports = resolvers;