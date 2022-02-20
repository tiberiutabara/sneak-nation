import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

import ProductList from '../../components/productList/ProductList'

// styles
import './Products.scss'

export default function Products() {
  const [products, setProducts] = useState([])
  const [pending, setPending] = useState('Loading...')
  const [search, setSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {

    const ref = collection(db, 'products')

    getDocs(ref)
      .then((snapshot) => {
        let results = []

        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })

        setProducts(results)
        setPending(null)
      })

  }, [])

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.title.toLowerCase().replace(/\s+/g, '').includes(search.toLowerCase().replace(/\s+/g, '')) ||
          product.description.toLowerCase().replace(/\s+/g, '').includes(search.toLowerCase().replace(/\s+/g, ''))
      )
    )
  }, [search, products]);

  return (
    <div>
      <label className='search'>
        <span>Search </span>
        <input 
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </label>

      {pending ? <p className='message'>{pending}</p> : <ProductList products={filteredProducts} />}
    </div>
  )
}