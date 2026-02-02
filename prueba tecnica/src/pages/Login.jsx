import React, { useState } from 'react';
import axios from 'axios';

import Input from '../components/Input';
import BotonActivo from '../components/BotonActivo';
import { useNavigate } from 'react-router-dom';

import '../styles/components.css';
import '../styles/login.css';

function Login() {

  const navigate = useNavigate();

  const [colaborador, setColaborador] = useState('');
  const [contraseña, setContraseña] = useState('');

  let payload = {
    "email": colaborador,
    "contrasena": contraseña,
  }

  const handleLogin = async () => {
    console.log('hola');
    try {
      const response = await axios.post('http://localhost:3000/login',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 200) {
        console.log('success');
        navigate('/colaboradores');
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      console.log('error');
      console.log(error);
    }

  }
  return (
    <div className='containerLogin'>
      <h1>Login</h1>
      <Input placeholder="Usuario" type="text" value={colaborador} onChange={(e) => setColaborador(e.target.value)} />
      <Input placeholder="Contraseña" type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      <BotonActivo textoBoton="Iniciar Sesión" onClick={handleLogin} />
    </div>
  )
}

export default Login