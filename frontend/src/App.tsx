import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface IData {
  status: Number
  data: string
}

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<IData>({status: 0, data: ''})
  useEffect(() => {
    const controller = new AbortController();
    const getDefault = async () => {
      console.log('fetch /');
      try {
        await axios.get(
          'http://localhost/'
        ).then(res => setData(res.data))
      } catch (err) {
        console.error(err);
      } finally {
        console.log('prout')
      }
    }
    getDefault();
    return () => controller.abort();
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Docker</h1>
      <h2>{data.data}</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
