import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// styles
import './ProductList.scss'

export default function ProductList({ products }) {
  const [error, setError] = useState(null)

  useEffect(() => {
    if(products.length == 0){
      setError('No search results')
    } else {
      setError(null)
    }
  }, [products])

  return (
    <div className='product-list'>
      <ul>
          {products.map(product => (
            <div key={product.id} className='product'>
              <Link to={product.id} >
                <span>{product.price} $</span>
                <img src={product['img-url']} alt={product.title} />
                <p>{product.title}</p>
              </Link>
            </div>
          ))}

          {error && <p>{error}</p>}
      </ul>
    </div>
  )
}