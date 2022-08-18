import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart } = useContext(CartContext);
  const { removeItemFromCart } = useContext(CartContext);
  const { deleteItemFromCart } = useContext(CartContext);
  const increaseProductQuantity = () => addItemToCart(cartItem);
  const decreaseProductQuantity = () => removeItemFromCart(cartItem);
  const removeProduct = () => deleteItemFromCart(cartItem);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={removeProduct}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
