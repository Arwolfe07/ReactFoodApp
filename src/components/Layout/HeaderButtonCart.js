import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderButtonCart.module.css';

const HeaderButtonCart = props => {
  const [buttonHighlight, setButtonHighlight] = useState(false);

  const cartContext = useContext(CartContext);

  const { items} = cartContext;

  const noOfCartItems = items.reduce((currItem, item) => {
    return currItem + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${buttonHighlight ? classes.bump : ''}`;
  
  useEffect(() => {
    if(items.length===0)
    {
      return;
    }
    setButtonHighlight(true);

    const timer = setTimeout(()=>{
      setButtonHighlight(false);
    },300)

    return ()=>{
    clearTimeout(timer);
    }
  }, [items]);
  
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.cart}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
}

export default HeaderButtonCart
