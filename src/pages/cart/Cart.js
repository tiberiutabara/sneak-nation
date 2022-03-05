import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

// Styles
import './Cart.scss'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [sum, setSum] = useState(0)
  const cart = []

  let navigate = useNavigate();

  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      cart.push(JSON.parse(localStorage.getItem(key)))
    });
  
    setCartItems(cart)
  }, [sum])

  useEffect(() => {
    setSum(cartItems.map(item => item.price).reduce((prev, curr) => prev + curr, 0))
  }, [cartItems])

  const clearCart = () => {
    if (window.confirm("Cart clear: Are you sure?")) {
      localStorage.clear()
      setSum(0)
    }
  }

  const removeCartItem = (keyName) => {
    localStorage.removeItem(keyName)
    setCartItems(cart)
  }

  return (
    <div className='cart-page'>

      {cartItems.length >= 1 && (
      <ul className='cart'>
      {cartItems.map(item => (
        <li key={item.title}>
          <img src={item.image} alt={item.title} />
          <p className='cart-link' onClick={() => {navigate('../products/' + item.link)}}>{item.title}</p>
          <span className='cart-price'>{item.price} $</span>
          <span className='cart-remove' onClick={() => removeCartItem(item.title)}>X</span>
        </li>
      ))}
      </ul>
      )}

      <div className='checkout'>
        <div className='cart-status'>
          {sum > 0 && <><p>Total</p> <p className='checkout-price'>{sum} $</p></>}
          {sum == 0 && <p className='message'>No products added to the cart</p>}
        </div>

        <button className='btn' onClick={clearCart}>Clear Cart</button>
        <button className='btn' onClick={() => {navigate('../')}}>Checkout</button>
      </div>
    </div>
  )
}