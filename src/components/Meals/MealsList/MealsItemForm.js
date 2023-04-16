import React, { useRef, useState } from "react";

import classes from "./MealsItemForm.module.css";
import Input from "../../UI/Input";

const MealsItemForm = (props) => {
    const [isFormValid, setIsFormValid] = useState(true);
    const amountInputRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = + enteredAmount;


        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setIsFormValid(false);
        }
        props.onAddToCart(enteredAmountNumber);
    }

    return <form className={classes.form} onSubmit={formSubmitHandler}>
        <Input ref={amountInputRef} label="Amount" input={{
            id: "amount_" + props.id,
            type: "number",
            step: "1",
            min: "1",
            max: "5",
            defaultValue: "1"
        }}></Input>
        <button>+ Add</button>
        {!isFormValid && <p>Please enter valid amount (1-5)</p>}
    </form>;
};

export default MealsItemForm;