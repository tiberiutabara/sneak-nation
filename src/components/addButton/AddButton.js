
// Styles
import { useState } from 'react'
import './AddButton.scss'

export default function AddButton({ product, id }) {
  const values = {
    title: product.title, 
    price: product.price, 
    image: product['img-url'],
    link: id
  }
  
  const addToCart = () => {
    localStorage.setItem(product.title , JSON.stringify(values))
  }

  return (
    <button onClick={addToCart}>Add to Cart</button>
  )
}