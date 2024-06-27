import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Menu from './components/Menu'

function App() {

  return (
    <>
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    </>
  )
}

export default App
