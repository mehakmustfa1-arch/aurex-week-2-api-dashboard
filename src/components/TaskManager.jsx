import { useState } from 'react'

export default function TaskManager(){
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if(task) {
      setTasks([...tasks, task])
      setTask('')
    }
  }

  return (
    <div style={{padding: '20px'}}>
      <h2>Task Manager - Week 4 Final</h2>
      <input value={task} onChange={e=>setTask(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t,i)=><li key={i}>{t}</li>)}
      </ul>
    </div>
  )
}