import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { items, isOpened } = useContext(CartContext);
  return (
    <div className={`cart-dropdown-container ${isOpened ? 'isOpened' : ''}`}>
      <div className="cart-items">
        {items.map((product) => (
          <span>product.name</span>
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
