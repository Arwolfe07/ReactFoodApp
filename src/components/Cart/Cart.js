import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const ctx = useContext(CartContext);
    const items = ctx.items;
    const hasItems = items.length > 0;

    const addItemHandler = (item) => { ctx.addItem({ ...item, amount: 1 }) };
    const removeItemhandler = (id) => { ctx.removeItem(id) };
    const cartItems = <ul className={classes["cart-items"]}>{items.map((item) => (
        <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} addItem={addItemHandler.bind(null, item)} removeItem={removeItemhandler.bind(null, item.id)}></CartItem>
    ))}</ul>
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const orderHandler = () => {
        setIsCheckout(true);
    }

    const orderSubmitHandler = async (userData) => {
        setIsSubmitting(true);
        fetch('https://foodapp-986b9-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: ctx.items
            })
        });
        setIsSubmitting(false);
        setIsSubmitted(true);
        ctx.clearCart();
    };

    const cartButtons = (<div className={classes.actions}>
        <button className={classes["button-close"]} onClick={props.onCloseCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>);

    const cartContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onCloseCart} onOrder={orderSubmitHandler} />}
        {!isCheckout && cartButtons}
    </React.Fragment>
    const submittingContent = <p>Ordering...</p>;
    const submittedContent = <React.Fragment>
        <p>Order Placed Successfuly!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onCloseCart}>Close</button>
        </div>
    </React.Fragment>

    return <Modal onClick={props.onCloseCart}>
        {!isSubmitting && !isSubmitted && cartContent}
        {isSubmitting && submittingContent}
        {!isSubmitting && isSubmitted && submittedContent}
    </Modal>
};

export default Cart;