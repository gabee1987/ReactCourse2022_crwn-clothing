import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartTotalPrice } = useContext(CartContext);
  return (
    <div className="items-table-container">
      <table className="items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product) => (
            <CheckoutItem key={product.id} item={product} />
          ))}
        </tbody>
      </table>
      <h1>TOTAL ${cartTotalPrice}</h1>
    </div>
  );
};

export default Checkout;
