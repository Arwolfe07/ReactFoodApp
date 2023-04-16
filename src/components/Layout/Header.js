import React, { Fragment } from "react";

import foodImg from "../../assets/food.jpg";
import classes from "./Header.module.css";
import HeaderButtonCart from "./HeaderButtonCart";


const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>Cheat Meals</h1>
            <HeaderButtonCart onClick={props.onOpenCart}/>
        </header>
        <div className={classes['main-img']}>
            <img src={foodImg} alt="This is just a pics" />
        </div>

    </Fragment>
}

export default Header;