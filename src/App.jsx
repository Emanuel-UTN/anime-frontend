import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { ModalDialog } from './components/ModalDialog'

import Menu from './components/Menu'
import Animes from './components/Animes/Animes'
import Etiquetas from './components/Recursos/Etiquetas'

function App() {

  return (
    <>
      <BrowserRouter>
        <ModalDialog />

        <Menu />
        <div className="divBody">
          <Routes>
            <Route path='/Inicio' element={""}/>
            <Route path='/Por-Ver' element={<Animes Busqueda={false} Estado='Por Ver' key={1}/>}/>
            <Route path='/Vistos' element={<Animes Busqueda={false} Estado='Visto' key={2}/>}/>
            <Route path='/Animes' element={<Animes Busqueda={true} key={3}/>}/>

            <Route path='/Etiquetas' element={<Etiquetas />}/>
            <Route path='/Calificaciones' element={""}/>
            <Route path='/Sitios' element={""}/>

            <Route path='*' element={<Navigate to="/Inicio" replace/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
