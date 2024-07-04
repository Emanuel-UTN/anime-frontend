import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { ModalDialog } from './components/ModalDialog'

import Menu from './components/Menu'
import Inicio from './components/Inicio'
import Animes from './components/Animes/Animes'
import Etiquetas from './components/Recursos/Etiquetas'
import Calificaciones from './components/Recursos/Calificaciones'
import Sitios from './components/Recursos/Sitios'

function App() {

  return (
    <>
      <BrowserRouter>
        <ModalDialog />

        <Menu />
        <div className="divBody">
          <Routes>
            <Route path='/Inicio' element={<Inicio />}/>
            <Route path='/Por-Ver' element={<Animes Busqueda={false} Estado='Por Ver' key={1}/>}/>
            <Route path='/Vistos' element={<Animes Busqueda={false} Estado='Visto' key={2}/>}/>
            <Route path='/Animes' element={<Animes key={3}/>}/>

            <Route path='/Etiquetas' element={<Etiquetas />}/>
            <Route path='/Calificaciones' element={<Calificaciones />}/>
            <Route path='/Sitios' element={<Sitios />}/>

            <Route path='*' element={<Navigate to="/Inicio" replace/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
