import productDTO from "../dao/DTOs/product.dto.js";

const productRepository = {
  createProduct: (product) => {
    const newProduct = new productDTO(product);
    return newProduct;
  },
};

export default productRepository;
