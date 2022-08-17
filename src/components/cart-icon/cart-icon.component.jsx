import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';
import { useContext } from 'react';

const CartIcon = () => {
  const { setIsOpened } = useContext(CartContext);

  const onClickHandle = () => {
    setIsOpened((isOpened) => !isOpened);
  };

  return (
    <div className="cart-icon-container" onClick={onClickHandle}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
