export default class productDTO {
  constructor(product) {
    this.title = product.title;
    this.description = product.description;
    this.code = product.code;
    this.category = product.category;
    this.brand = product.brand;
    this.price = product.price;
    this.stock = product.stock;
    this.status = product.status;
    this.thumbnails = product.thumbnails;
  }
}
