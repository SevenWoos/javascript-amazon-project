import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';


// Async Await = Shortcut for Promises.
// Async makes a function return a promise.
async function loadPage() {
  // Await lets you write async code like normal code. Can only be used inside async function and on PROMISES.
  await loadProductsFetch();

  const value = await new Promise((resolve) => {
    loadCart(() => {
      resolve('value3');
    });
  });

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
};
loadPage();

// Promises = better way to handle asynchronous code. Similiar to done(). Lets us wait for code to finish before moving to next step. Helps avoid besting and keeps code flat.

// promise.all() lets us run multiple promises at the SAME TIME, and wait for all of them to finish. Use an array of promises.
/*
Promise.all([
  loadProductsFetch(), 

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    // resolve parameter = function that lets us control when to go to the next step.
    resolve('value1');
  });

  // Does next step(then()) in SEPARATE THREAD independent of the other code.
}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
// Multiple callbacks = a lot of nesting(code inside code).
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
