import React, { useEffect, useState } from 'react'
import Select from '../components/Select'
import Input from '../components/Input'
import BotonActivo from '../components/BotonActivo'
import Table from '../components/Table'
import Modal from '../components/modal'
import HeaderMain from '../components/HeaderMain'
import '../styles/empresas.css'
import axios from 'axios';

function EmpresasList() {
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');
  const [empresas, setEmpresas] = useState([]);
  const [filterType, setFilterType] = useState('nombre');
  const [searchTerm, setSearchTerm] = useState('');

  const [nuevaEmpresa, setNuevaEmpresa] = useState({
    nit: '',
    razon_social: '',
    nombre_comercial: '',
    telefono: '',
    email: '',
    id_geografia: ''
  });

  const obtenerEmpresas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/empresas', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setEmpresas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarEmpresas = async (id) => {
    const payload = {
      id_empresa: id
    }
    try {
      const response = await axios.delete(`http://localhost:3000/eliminarEmpresa`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          data: payload
        });
      console.log(response.data);
      obtenerEmpresas();
    } catch (error) {
      console.log(error);
    }
  }

  const crearEmpresa = () => {
    setNuevaEmpresa({
      nit: '',
      razon_social: '',
      nombre_comercial: '',
      telefono: '',
      email: '',
      id_geografia: ''
    });
    setEditingId(null);
    setModal(true);
  };

  const editarEmpresa = (empresa) => {
    setNuevaEmpresa({
      id_empresa: empresa.id_empresa,
      nit: empresa.nit,
      razon_social: empresa.razon_social,
      nombre_comercial: empresa.nombre_comercial,
      telefono: empresa.telefono || '',
      email: empresa.email,
      id_geografia: empresa.id_geografia || 1
    });
    setEditingId(empresa.id_empresa);
    setModal(true);
  };

  const handleChangeNuevaEmpresa = (e, field) => {
    setNuevaEmpresa({
      ...nuevaEmpresa,
      [field]: e.target.value
    });
  };

  const handleSave = async () => {

    try {
      if (editingId) {

        await axios.put(`http://localhost:3000/actualizarEmpresa`, nuevaEmpresa, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("actualizado");
      } else {
        await axios.post('http://localhost:3000/crearEmpresa', nuevaEmpresa, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
      setModal(false);
      obtenerEmpresas();
    } catch (error) {
      console.log(error);
    }
  }

  const filteredEmpresas = empresas.filter((empresa) => {
    if (!searchTerm) return true;
    const valueToCheck = empresa[filterType] ? empresa[filterType].toString().toLowerCase() : '';
    return valueToCheck.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  if (modal) {
    return (
      <Modal
        tituloModal={editingId ? "Editar Empresa" : "Agregar Empresa"}
        textoBotonModal="X"
        onClick={() => setModal(false)}
        inputs={[
          { placeholder: 'Nit', type: 'text', value: nuevaEmpresa.nit, onChange: (e) => handleChangeNuevaEmpresa(e, 'nit') },
          { placeholder: 'Razon Social', type: 'text', value: nuevaEmpresa.razon_social, onChange: (e) => handleChangeNuevaEmpresa(e, 'razon_social') },
          { placeholder: 'Nombre Comercial', type: 'text', value: nuevaEmpresa.nombre_comercial, onChange: (e) => handleChangeNuevaEmpresa(e, 'nombre_comercial') },
          { placeholder: 'Telefono', type: 'text', value: nuevaEmpresa.telefono, onChange: (e) => handleChangeNuevaEmpresa(e, 'telefono') },
          { placeholder: 'Email', type: 'text', value: nuevaEmpresa.email, onChange: (e) => handleChangeNuevaEmpresa(e, 'email') },
          { placeholder: 'Geografia', type: 'text', value: nuevaEmpresa.id_geografia, onChange: (e) => handleChangeNuevaEmpresa(e, 'id_geografia') }
        ]}
        textoBotonModalGuardar="Guardar"
        onClickGuardar={handleSave}
      />
    );
  }

  return (
    <>
      <HeaderMain />
      <div className='containerEmpresasGeneral'>
        <div className='containerColaboradores'>
          <h1>Empresas</h1>
          <div className="filtrosEmpresas">
            {/* <Select options={[
              { value: 'nit', label: 'Nit' },
              { value: 'razon_social', label: 'Razon Social' },
              { value: 'nombre_comercial', label: 'Nombre Comercial' },
              { value: 'telefono', label: 'Telefono' },
              { value: 'email', label: 'Email' },
              { value: 'id_geografia', label: 'Geografia' },
            ]} value={filterType} onChange={(e) => setFilterType(e.target.value)} /> */}
            <Input placeholder="Buscar" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <BotonActivo textoBoton="Agregar Empresa" onClick={crearEmpresa} />
          </div>
          <div className="containerTable">
            <Table idKey="id_empresa" tabaHeaders={['ID', 'Nit', 'Razon social', 'Nombre comercial', 'Telefono', 'Email', 'Geografia', 'Municipio', 'País', 'Acciones']} data={filteredEmpresas} acciones={(empresa) => (
              <div className='accionesColaborador'>
                <BotonActivo textoBoton="Editar" onClick={() => editarEmpresa(empresa)} />
                <BotonActivo textoBoton="Eliminar" onClick={() => { eliminarEmpresas(empresa.id_empresa); }} />
              </div>
            )} />
          </div>
        </div>
      </div>
    </>
  )
}

export default EmpresasList