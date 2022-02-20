import AdminForm from '../../components/adminForm/AdminForm'
import ModalEdit from '../../components/modalEdit/ModalEdit'

import { useEffect, useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { db } from '../../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

// styles
import './Admin.scss'

export default function Admin() {
  const { documents: products } = useCollection('products')
  const [pending, setPending] = useState('Loading...')

  useEffect(() => {
    products && setPending(null)
  }, [products])

  // delete
  const handleDelete = async (id) => {
    const docRef = doc(db, 'products', id)
    await deleteDoc(docRef)
  }

  return (
    <div>
        <h2>Admin</h2>

        <AdminForm />

        {pending && <p className='message'>{pending}</p>}
        <ul>
          {products && products.map(product => (
            <li key={product.id}>{product.title} 

            <button onClick={() => {
              if (window.confirm("Delete the item?")) {
                handleDelete(product.id)
              }}}> X</button>

            <ModalEdit docId={product.id}/>
            </li>
          ))}
        </ul>
    </div>
  )
}
