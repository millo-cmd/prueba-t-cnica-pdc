import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import ColaboradorList from '../pages/ColaboradorList'
import EmpresasList from '../pages/EmpresasList'
import GografiaList from '../pages/GografiaList'
import AsignacionEmpresaColaborador from '../pages/AsignacionEmpresaColaborador'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/colaboradores" element={<ColaboradorList />} />
        <Route path="/empresas" element={<EmpresasList />} />
        <Route path="/geografia" element={<GografiaList />} />
        <Route path="/asignacion" element={<AsignacionEmpresaColaborador />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes