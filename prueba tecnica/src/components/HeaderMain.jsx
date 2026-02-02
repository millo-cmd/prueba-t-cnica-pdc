import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
//import { autenticacionToken } from '../utils/autenticacionToken';


function HeaderMain() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    //autenticacionToken(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="menu-desktop flex items-center gap-10 ml-auto">
        <li><NavLink to="/colaboradores">Colaboradores</NavLink></li>
        <li><NavLink to="/geografia">Geografía</NavLink></li>
        <li><NavLink to="/empresas">Empresas</NavLink></li>
        <li><NavLink to="/asignacion">Asignación</NavLink></li>
        <li><NavLink to="/login" onClick={handleLogout}>Salir</NavLink></li>
      </ul>
    </nav>
  )
}

export default HeaderMain