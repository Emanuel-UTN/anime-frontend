import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { ModalDialog } from 'react-bootstrap'

import Menu from './components/Menu'

function App() {

  return (
    <>
      <BrowserRouter>
        <ModalDialog />

        <Menu />
        <div className="divBody">
          <Routes>
            <Route path='/Inicio'/>
            <Route path='/Por-Ver'/>
            <Route path='/Vistos'/>
            <Route path='/Animes'/>

            <Route path='/Etiquetas'/>
            <Route path='/Calificaciones'/>
            <Route path='/Sitios'/>

            <Route path='*' element={<Navigate to="/Inicio" replace/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
