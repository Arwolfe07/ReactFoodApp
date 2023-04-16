import React, {
  useState
} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const openCartHandler = () => {
    setShowCart(true);
  }

  const closeCartHandler = () => {
    setShowCart(false);
  }

  return (<CartProvider > {
    showCart && < Cart onCloseCart={
      closeCartHandler
    }
    />} <Header onOpenCart={
      openCartHandler
    } />
    <main >
      <Meals />
    </main>
  </CartProvider>
  );
}

export default App;