import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

// Styles
import './Banner.scss'

export default function Banner() {
    const [banner, setBanner] = useState('')

    const docRef = doc(db, 'images', 'E2GssboKCLdJKkwfq4FM')

    useEffect(() => {
        getDoc(docRef).then((doc) => setBanner(doc.data()) )

    }, [])

    return(
        <div className='banner'>
           <img src={banner.url} alt='Home page banner' />
        </div>
    )
}