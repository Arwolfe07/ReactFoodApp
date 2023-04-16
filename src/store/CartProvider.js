import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {

        const updateAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingItemIndex];
        let items;
        if (existingItem) {
            let updateItem = { ...existingItem, amount: existingItem.amount + action.item.amount };
            items = [...state.items];
            items[existingItemIndex] = updateItem;
        }
        else {
            items = state.items.concat(action.item);

        }
        return {
            items: items,
            totalAmount: updateAmount
        };
    }

    if (action.type === "REMOVE") {
        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingItemIndex];
        const totalAmount = state.totalAmount - existingItem.price;
        let items;
        if (existingItem.amount === 1) {
            items = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            items = [...state.items];
            items[existingItemIndex] = updatedItem;
        }

        return {
            items: items,
            totalAmount: totalAmount
        };

    }
    if (action.type === "CLEAR") {
        return defaultCartState;
    }


    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
    };

    const clearCartHandler = () =>{
        dispatchCartAction({type: "CLEAR"});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;