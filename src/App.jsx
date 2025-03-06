import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";
import {db} from "./data/db";
import "./App.css";
import { useState } from "react";



function App() {
 const [data, setData] = useState(db)
 const [cart ,setCart] = useState([]);


  return (
    <>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} 
            guitar={guitar}
         
            setCart={setCart}
             />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
