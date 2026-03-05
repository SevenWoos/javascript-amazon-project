import {validDeliveryOption} from './deliveryOptions.js';

// Creating Cart Class
class Cart {
  cartItems;
  // Private property that can only be used inside this class.
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  // Private Method
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ||
      [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
          quantity: 2, 
          deliveryOptionId: '1'
        }, 
    
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
          quantity: 1, 
          deliveryOptionId: '2'
        }
      ];
    }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity) {
    let matchingItem;
  
    // Check for duplicate items do we can increase quantity
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    // const quantitySelector = document.querySelector(
    //     `.js-quantity-selector-${productId}`
    // );
    // const quantity = Number(quantitySelector.value);
  
    if(matchingItem) {
      matchingItem.quantity+=quantity;
    }
    else {
      this.cartItems.push({
        productId: productId, 
        quantity: quantity, 
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      };
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    // Case where we have an invalid productId NOT in the cart(we cannot update its delivery option), do nothing.
    if (!matchingItem) {
      return;
    };
  
    // Case where we have an invalid deliveryOptionId. Do nothing.
    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    };
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      };
    });
  
    matchingItem.quantity = newQuantity;
  
    this.saveToStorage();
  }
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

// cart.#localStoragekey = 'test';

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);