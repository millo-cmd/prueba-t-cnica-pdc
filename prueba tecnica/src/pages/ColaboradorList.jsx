import React, { useEffect, useState } from 'react'

import axios from 'axios';

import '../styles/colaboradores.css'


import Select from '../components/Select'
import Input from '../components/Input'
import BotonActivo from '../components/BotonActivo'
import Table from '../components/Table'
import Modal from '../components/modal'
import HeaderMain from '../components/HeaderMain'

function ColaboradorList() {
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');
  const [colaboradores, setColaboradores] = useState([]);
  const [filterType, setFilterType] = useState('nombre');
  const [searchTerm, setSearchTerm] = useState('');

  const [nuevoColaborador, setNuevoColaborador] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    contrasena: '',
    id_rol: 1
  });

  const obtenerColaboradores = async () => {
    try {
      const response = await axios.get('http://localhost:3000/colaboradores', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setColaboradores(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarColaboradores = async (id) => {
    const payload = {
      id_colaborador: id
    }
    try {
      const response = await axios.delete(`http://localhost:3000/eliminarColaborador`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          data: payload
        });
      console.log(response.data);
      obtenerColaboradores();
    } catch (error) {
      console.log(error);
    }
  }

  const crearColaborador = () => {
    setNuevoColaborador({
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      contrasena: '',
      id_rol: 1
    });
    setEditingId(null);
    setModal(true);
  };

  const editarColaborador = (colaborador) => {
    console.log(colaborador);
    setNuevoColaborador({
      id_colaborador: colaborador.id_colaborador,
      nombre: colaborador.nombre,
      apellido: colaborador.apellido,
      telefono: colaborador.telefono || '',
      email: colaborador.email,
      contrasena: colaborador.contrasena,
      id_rol: colaborador.id_rol || 1
    });
    setEditingId(colaborador.id_colaborador);
    setModal(true);
  };

  const handleChangeNuevoColaborador = (e, field) => {
    setNuevoColaborador({
      ...nuevoColaborador,
      [field]: e.target.value
    });
  };

  const handleSave = async () => {

    try {
      if (editingId) {
        console.log("estoy editando");
        console.log(nuevoColaborador);

        await axios.put(`http://localhost:3000/actualizarColaborador`, nuevoColaborador, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("actualizado");
      } else {
        await axios.post('http://localhost:3000/crearColaborador', nuevoColaborador, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
      setModal(false);
      obtenerColaboradores();
    } catch (error) {
      console.log(error);
    }
  }

  // Filtrar colaboradores dinámicamente
  const filteredColaboradores = colaboradores.filter((colaborador) => {
    if (!searchTerm) return true;
    const valueToCheck = colaborador[filterType] ? colaborador[filterType].toString().toLowerCase() : '';
    return valueToCheck.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    obtenerColaboradores();
  }, []);

  if (modal) {
    const inputsBase = [
      { placeholder: 'Nombre', type: 'text', value: nuevoColaborador.nombre, onChange: (e) => handleChangeNuevoColaborador(e, 'nombre') },
      { placeholder: 'Apellido', type: 'text', value: nuevoColaborador.apellido, onChange: (e) => handleChangeNuevoColaborador(e, 'apellido') },
      { placeholder: 'Teléfono', type: 'text', value: nuevoColaborador.telefono, onChange: (e) => handleChangeNuevoColaborador(e, 'telefono') },
      { placeholder: 'Email', type: 'text', value: nuevoColaborador.email, onChange: (e) => handleChangeNuevoColaborador(e, 'email') }
    ];

    const inputsFinales = [
      ...inputsBase,
      !editingId ? {
        placeholder: 'Contraseña',
        type: 'password',
        value: nuevoColaborador.contrasena,
        onChange: (e) => handleChangeNuevoColaborador(e, 'contrasena')
      } : null
    ].filter(Boolean);

    return (
      <Modal
        tituloModal={editingId ? "Editar Colaborador" : "Agregar Colaborador"}
        textoBotonModal="X"
        onClick={() => setModal(false)}
        inputs={inputsFinales}
        textoBotonModalGuardar="Guardar"
        onClickGuardar={handleSave}
      />
    );
  }

  return (
    <>
      <HeaderMain />
      <div className='containerColaboradoresGeneral'>
        <div className='containerColaboradores'>
          <h1>Colaboradores</h1>
          <div className="filtrosColaboradores">
            {/* <Select options={[
              { value: 'nombre', label: 'Nombre' },
              { value: 'apellido', label: 'Apellido' },
              { value: 'correo', label: 'Correo' },
              { value: 'telefono', label: 'Telefono' },
              { value: 'rol', label: 'Rol' },
              { value: 'estado', label: 'Estado' },
            ]} value={filterType} onChange={(e) => setFilterType(e.target.value)} /> */}
            <Input placeholder="Buscar" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <BotonActivo textoBoton="Agregar Colaborador" onClick={crearColaborador} />
          </div>
          <div className='containerTable'>
            <Table tabaHeaders={['ID', 'Nombre', 'Apellido', 'Correo', 'Telefono', 'Rol', 'Acciones']} data={filteredColaboradores} acciones={(colaborador) => (
              <div className='accionesColaborador'>
                <BotonActivo textoBoton="Editar" onClick={() => editarColaborador(colaborador)} />
                <BotonActivo textoBoton="Eliminar" onClick={() => { eliminarColaboradores(colaborador.id_colaborador); }} />
              </div>
            )} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ColaboradorList