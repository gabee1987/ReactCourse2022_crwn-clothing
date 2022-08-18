import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
  const { name, price, imageUrl, quantity } = item;
  const { addItemToCart } = useContext(CartContext);
  const { removeItemFromCart } = useContext(CartContext);
  const { deleteItemFromCart } = useContext(CartContext);
  const increaseProductQuantity = () => addItemToCart(item);
  const decreaseProductQuantity = () => removeItemFromCart(item);
  const removeProduct = () => deleteItemFromCart(item);
  return (
    <tr>
      <td className="product-img-cell">
        <img src={imageUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>
        <button onClick={decreaseProductQuantity}> - </button>
        {quantity}
        <button onClick={increaseProductQuantity}> + </button>
      </td>
      <td>{price}</td>
      <td>
        <button onClick={removeProduct}>X</button>
      </td>
    </tr>
  );
};

export default CheckoutItem;
