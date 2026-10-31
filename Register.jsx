import { useState } from 'react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{padding: '20px'}}>
      <h2>Register - Week 4</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <br/><br/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <br/><br/>
      <button>Register</button>
    </div>
  )
}