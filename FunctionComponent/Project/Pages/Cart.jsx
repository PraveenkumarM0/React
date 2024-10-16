import React from "react"
import './Cart.css'

const Cart = ({ cart, setCart }) => {

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.Price, 0);
  }

  const handleResetCart = () => {
    setCart([])
  }

  return (
    <div className="Cart">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>No Items in Cart</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              <img src={product.img} alt={product.name} />
              {product.name} - Rs {product.Price}
            </li>
          ))}
        </ul>
      )}
      <h2>Total Rs - {getTotalPrice()}</h2>
     
      <button type="button" onClick={handleResetCart}>Reset</button>
      <button onClick={() => alert('Your order is Confirmed')}>Confirm Order</button>
    </div>
  )
}


export default Cart;
