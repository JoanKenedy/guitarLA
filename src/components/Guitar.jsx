export default function Guitar ({guitar, addToCart}){
  const { id, name, image, description, price } = guitar
  // Setear el estado setCart para ageragar la guitarra al carrito de compras
  // Este es una de las formas de hacerlo y que persistan los datos, osea si ya se grego que mantengan 
  // los items anteriores
  // const handleClick = (guitar) => {
  //   Aqui se toma una copia del cart con el spred operator
  //   setCart([...cart, guitar])
  // }
    return (
      <div className="col-md-6 col-lg-4 my-4 row align-items-center" >
        <div className="col-4">
          <img
            className="img-fluid"
            src={`/img/${image}.jpg`}
            alt="imagen guitarra"
          />
        </div>
        <div className="col-8">
          <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
          <p>
            {description}
          </p>
          <p className="fw-black text-primary fs-3">${price}</p>
          <button 
          type="button" 
          className="btn btn-dark w-100"
          // Primera forma de agregar al carrito con la funcion handleClick
          // Aqui esperamos el evento click y a la funcion se le pasa el elemento
          // onClick={() => handleClick(guitar)}

          // Segunda forma pasarle todo el state
          // onClick={() => setCart([...cart, guitar])}
          

          // Tercera opcion el setCart ya sabe que trae consigo el cart, entonces por conveción
          // Se pasa otro callback y se le pasa el state anterior y se hace una copia con spred operator
          // Por convencion se le pone el prevSate , prevCart haciendo al estado anterior en este caso del carrito etc...
         
          // onClick={() => setCart((prevCart) => [...prevCart, guitar])}
            onClick={() => addToCart(guitar)}
           >
            Agregar al Carrito
          </button>
        </div>
      </div>
    );
}