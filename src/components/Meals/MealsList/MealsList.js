import React, { useContext } from "react";

import MealsItemForm from "./MealsItemForm";
import CartContext from "../../../store/cart-context";
import classes from "./MealsList.module.css";

const MealsList = (props) => {
    const price = `$${Number.parseFloat(props.price).toFixed(2)}`;
    const ctx = useContext(CartContext);

    const addItemHandler = (amount) => {
        ctx.addItem({
        id: props.id,
        amount: amount,
        name: props.name,
        price: props.price
    })
    }

    return <li className={classes["meals-list"]}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealsItemForm id={props.id} onAddToCart={addItemHandler} />
        </div>
    </li>
};

export default MealsList;