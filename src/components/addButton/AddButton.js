
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
    alert('Product added - Success!')
  }

  return (
    <button className='btn' onClick={addToCart}>Add to Cart</button>
  )
}