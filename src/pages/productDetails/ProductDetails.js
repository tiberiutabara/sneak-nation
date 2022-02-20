import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

import AddButton from '../../components/addButton/AddButton'

// Styles
import './ProductDetails.scss'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [error, setError] = useState(null)
  const [pending, setPending] = useState('Loading...')

  const docRef = doc(db, 'products', id)

  useEffect(() => {

    getDoc(docRef)
      .then((doc) => {
        
        if (doc.exists()) {
          setProduct(doc.data())
          setPending(null)
        } else {
          setError('404: Nothing found on this URL')
          setPending(null)
        }

      })

  }, [id])

  return (
    <div>
      {pending && <p className='message'>{pending}</p>}
      {error && <p className='message'>{error}</p>}

      <p>{product.title}</p>
      <p>{product.colour}</p>
      <p>{product.price} </p>
      <img src={product['img-url']} alt={product.title} />
      <p>{product.description}</p>

      <AddButton product={product} id={id} />

    </div>
  )
}