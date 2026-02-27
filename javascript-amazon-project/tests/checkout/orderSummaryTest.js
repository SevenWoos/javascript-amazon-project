import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';

// Integration test = tests many units/pieces of code working together.

// Hooks = Lets you run code for each test. EX: beforeEach()

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  // beforeEach hook runs function before each test. 
  // Put setup code in here.
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container')
      .innerHTML = `
        <div class="js-checkout-header"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
      `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1, 
          quantity: 2, 
          deliveryOptionId: '1'
        }, 
    
        {
          productId: productId2, 
          quantity: 1, 
          deliveryOptionId: '2'
        }
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  // afterEach hook to cleanup the HTML after each spec.
  afterEach(() => {
    document.querySelector('.js-test-container')
      .innerHTML = '';
  });

  it('displays the cart', () => {
    // Check if we have 2 cart-item-containers
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    // Check the quantities of each cart item is correct.
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    // Check that the product name is correctly displayed.
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');
  });

  // Checks if "delete" link works correctly.
  it('removes a product', () => {
    // Delete first product by clicking.
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    // Check productId1 is null
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    // Check productId2 is still on page.
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    // Is cart array updated.
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    // Check that the product name is correctly displayed.
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');
  });
});