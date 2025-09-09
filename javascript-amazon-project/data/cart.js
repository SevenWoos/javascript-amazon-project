// This variable can now be used outside of cart.js
export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  // Check for duplicate items do we can increase quantity
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity+=1;
  }
  else {
    cart.push({
      productId: productId, 
      quantity: 1
    });
  }
};