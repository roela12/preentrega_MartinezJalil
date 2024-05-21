import cartDTO from "../dao/DTOs/cart.dto.js";

const cartRepository = {
  createCart: (cart) => {
    const newCart = new cartDTO(cart);
    return newCart;
  },
};

export default cartRepository;
