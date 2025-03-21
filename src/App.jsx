import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";
import {db} from "./data/db";
import "./App.css";
import { useState, useEffect } from "react";



function App() {

  // Esto se hace para tener un carrito persistente
  const initialCart = () => {
    // Traemos lo que tenemos en localstorage en este caso el carrito
  const localStorageCart = localStorage.getItem('cart');
  // Si hay algo volvemos a setear a formato con parse ya que viene como string y si no le seteamos a un array vacio
  return localStorageCart ? JSON.parse(localStorageCart) : [];
  }
// El state es asincrono 
 const [data] = useState(db)
 const [cart ,setCart] = useState(initialCart);

 const MAX_ITEMS = 5;
 const MIN_ITEMS = 1;

 useEffect(() => {
  // Para tener el cart en el localstorage dependiendo de los cambios que sufra el carrito
  // Y lo pasamos de texto plano a json
  localStorage.setItem('cart', JSON.stringify(cart))
 }, [cart])

function addToCart(item) {
  const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
  if(itemExist >= 0){
    if(cart[itemExist].quantity >= MAX_ITEMS) return
     // El state es inmutable, por eso se crea una copia del state para despues setearlo
     const updateCart = [...cart];
     updateCart[itemExist].quantity++
     setCart(updateCart);
  }else{
    item.quantity = 1;
    setCart( [...cart, item]);
  }
  
}

function removeFromCart(id){
  setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
}

function decreaseQuantity(id) {
  const updateCart = cart.map((item) => {
    if (item.id === id && item.quantity > MIN_ITEMS) {
      return {
        ...item,
        quantity: item.quantity - 1,
      };
    }
    return item;
  });

  setCart(updateCart);
}

function increaseQuantity(id){
  const updateCart = cart.map(item => {
    if(item.id === id && item.quantity < MAX_ITEMS){
      return {
        ...item,
        quantity: item.quantity + 1
      }
    }

    return item;
  })
  setCart(updateCart)
}

function cleanCart(){
  setCart([])
}


  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        cleanCart={cleanCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
