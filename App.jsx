import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const API = 'http://localhost:5000'

  const auth = async () => {
    const url = isLogin ? `${API}/api/auth/login` : `${API}/api/auth/register`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await res.json()
    if (data.token || data.email) {
      if (isLogin) {
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        fetchTasks(data.token)
      } else {
        alert('Registered! Now Login')
        setIsLogin(true)
      }
    } else {
      alert(data.message)
    }
  }

  const fetchTasks = async (token = user?.token) => {
    const res = await fetch(`${API}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (Array.isArray(data)) setTasks(data)
  }

  const addTask = async () => {
    if (!title) return
    await fetch(`${API}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify({ title })
    })
    setTitle(''); fetchTasks()
  }

  const deleteTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` }
    })
    fetchTasks()
  }

  useEffect(() => { if (user) fetchTasks() }, [])

  if (!user) {
    return (
      <div style={{ maxWidth: 400, margin: '80px auto', padding: 20, border: '1px solid #ddd', borderRadius: 10 }}>
        <h2>{isLogin ? 'Login' : 'Register'} - AUREX Dashboard</h2>
        {!isLogin && <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 10, margin: '5px 0' }} />}
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 10, margin: '5px 0' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 10, margin: '5px 0' }} />
        <button onClick={auth} style={{ width: '100%', padding: 10, marginTop: 10, background: 'black', color: 'white' }}>{isLogin ? 'Login' : 'Register'}</button>
        <p onClick={() => setIsLogin(!isLogin)} style={{ textAlign: 'center', cursor: 'pointer', color: 'blue' }}>{isLogin ? 'New? Register' : 'Have account? Login'}</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Welcome, {user.name} - Tasks</h2>
        <button onClick={() => { localStorage.clear(); setUser(null) }}>Logout</button>
      </div>
      <div style={{ display: 'flex', gap: 10, margin: '20px 0' }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New Task" style={{ flex: 1, padding: 10 }} />
        <button onClick={addTask} style={{ padding: '10px 20px', background: 'black', color: 'white' }}>Add</button>
      </div>
      {tasks.map(t => (
        <div key={t._id} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, border: '1px solid #eee', marginBottom: 8, borderRadius: 6 }}>
          <span>{t.title}</span>
          <button onClick={() => deleteTask(t._id)} style={{ color: 'red' }}>Delete</button>
        </div>
      ))}
      {tasks.length === 0 && <p style={{ textAlign: 'center', color: '#9ca3a3', marginTop: '40px' }}>No tasks yet. Add one!</p>}
    </div>
  )
}

export default App