import { useState } from 'react'

export default function Login(){
  const [email, setEmail] = useState('')
  return (
    <div style={{padding:'20px'}}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" /><br/><br/>
      <button>Login</button>
    </div>
  )
}