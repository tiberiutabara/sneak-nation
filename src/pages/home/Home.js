import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Link } from 'react-router-dom'

import ProductList from '../../components/productList/ProductList'

// styles
import './Home.scss'
import Banner from '../../components/banner/Banner'

export default function Home() {
  const [products, setProducts] = useState(null)
  const [pending, setPending] = useState('Loading...')

  useEffect(() => {
    const ref = collection(db, 'products')
    const q = query(ref, where('featured', '==', true))

    getDocs(q)
      .then((snapshot) => {
        let results = []

        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })

        setProducts(results)
        setPending(null)
      })

  }, [])

  return (
    <div className='home'>
      <Banner /> <br />

      {pending && <p className='message'>{pending}</p>}
      {products && <h2 className='featured'>Featured</h2>}
      {products && <ProductList products={products} />}

      <Link to='/products'><button className='btn'>See all products</button></Link>

      <p className='quote'>The Jordan Family DNA is in all of us, with hard work, determination,
      swagger, and drive you can accomplish whatever you put your mind to,
      because you’re here for a reason.</p>
    </div>
  )
}