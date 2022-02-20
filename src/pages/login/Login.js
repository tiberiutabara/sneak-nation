import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles

import './Login.scss'

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, login } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className='login'>
        <p className='login-title'>Log In</p>

        <form onSubmit={handleSubmit} className='login'>
          <label>
            <span>Email</span>
            <input 
              required
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label>
            <span>Password</span>
            <input 
              required
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <button className='btn'>Log In</button>

          {error && <p className='message'>{error}</p>}

        </form>
    </div>
  )
}
