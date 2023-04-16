import React, { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
    const isEmpty = value => value.trim() === '';
    const isSixChars = value => value.trim().length === 6;

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        pin: true,
        City: true
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const pincodeRef = useRef();
    const cityRef = useRef();

    const CheckoutHandler = (event) => {
        event.preventDefault();
        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPin = pincodeRef.current.value;
        const enteredCity = cityRef.current.value;

        const nameValid = !isEmpty(enteredName);
        const streetValid = !isEmpty(enteredStreet);
        const cityValid = !isEmpty(enteredCity);
        const pinValid = isSixChars(enteredPin);

        setFormValidity({
            name: nameValid,
            street: streetValid,
            pin: pinValid,
            City: cityValid
        })

        const formIsValid = nameValid &&
            streetValid && cityValid && pinValid;

        if (!formIsValid) {
            return;
        }

        // Form Valid Client Side
        props.onOrder({
            name: enteredName,
            street: enteredStreet,
            pin: enteredPin,
            city: enteredCity
        })
    }

    const nameClasses = `${classes.input} ${formValidity.name ? '' : classes.invalid}`;
    const streetClasses = `${classes.input} ${formValidity.street ? '' : classes.invalid}`;
    const cityClasses = `${classes.input} ${formValidity.city ? '' : classes.invalid}`;
    const pinClasses = `${classes.input} ${formValidity.pin ? '' : classes.invalid}`;

    return <form className={classes.form} onSubmit={CheckoutHandler}>
        <div className={nameClasses}>
            <label for="name">Name</label>
            <input id="name" type="text" ref={nameRef}></input>
            {!formValidity.name && <p>Enter a valid name!</p>}
        </div>
        <div className={streetClasses}>
            <label for="street">Street</label>
            <input id="street" type="text" ref={streetRef}></input>
            {!formValidity.street && <p>Enter a valid street!</p>}
        </div>
        <div className={pinClasses}>
            <label for="pincode">Pincode</label>
            <input id="pincode" type="text" ref={pincodeRef}></input>
            {!formValidity.pin && <p>Enter a valid pincode!</p>}
        </div>
        <div className={cityClasses}>
            <label for="city">City</label>
            <input id="city" type="text" ref={cityRef}></input>
            {!formValidity.City && <p>Enter a valid city!</p>}
        </div>
        <div className={classes.action}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button type="submit" className={classes.submit}>Confirm</button>
        </div>
    </form>
};

export default Checkout;