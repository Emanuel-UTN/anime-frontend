import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { ModalDialog } from 'react-bootstrap'

import Menu from './components/Menu'

import AnimeItem from './components/AnimeItem'
function App() {

  return (
    <>
      <BrowserRouter>
        <ModalDialog />

        <Menu />
        <div className="divBody">
          <Routes>
            <Route path='/Inicio' element={<AnimeItem />}/>
            <Route path='/Por-Ver' element={""}/>
            <Route path='/Vistos' element={""}/>
            <Route path='/Animes' element={""}/>

            <Route path='/Etiquetas' element={""}/>
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
