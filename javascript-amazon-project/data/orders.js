export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  // Add order to FRONT of array.
  orders.unshift(order);
  saveToStorage();
};  

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
};