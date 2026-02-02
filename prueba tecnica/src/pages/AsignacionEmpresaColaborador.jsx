import { useState, useEffect } from 'react'

import axios from 'axios';

import HeaderMain from '../components/HeaderMain';
import Select from '../components/Select';
import Input from '../components/Input';
import BotonActivo from '../components/BotonActivo';
import Table from '../components/Table';
import Modal from '../components/modal';

import '../styles/asignacion.css';

function AsignacionEmpresaColaborador() {

  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');
  const [asignaciones, setAsignaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataSelectFiltroEmpresas, setDataSelectFiltroEmpresas] = useState([]);

  const [filterType, setFilterType] = useState('nombre');

  const [nuevaAsignacion, setNuevaAsignacion] = useState({
    id_colaborador: '',
    id_empresa: '',
  });

  const obtenerAsignaciones = async () => {
    try {
      const response = await axios.get('http://localhost:3000/obtenerAsignaciones', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAsignaciones(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarAsignacion = async (id_asignacion) => {
    const payload = {
      id_asignacion: id_asignacion
    }
    try {
      const response = await axios.delete('http://localhost:3000/desvincularColaborador', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: payload
      });
      console.log(response.data);
      obtenerAsignaciones();
    } catch (error) {
      console.log(error);
    }
  }

  const crearAsignacion = () => {
    setModal(true);
    setEditingId(null);
    setNuevaAsignacion({
      id_colaborador: '',
      id_empresa: '',
    });
  }

  const editarAsignacion = (asignacion) => {
    console.log(asignacion);
    setNuevaAsignacion({
      id_asignacion: asignacion.id_asignacion,
      id_colaborador: asignacion.id_colaborador,
      id_empresa: asignacion.id_empresa,
    });
    setEditingId(asignacion.id_asignacion);
    setModal(true);
  };

  const handleChangeNuevaAsignacion = (e, field) => {
    setNuevaAsignacion({
      ...nuevaAsignacion,
      [field]: e.target.value
    });
  };

  const handleSave = async () => {

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/actualizarColaboradorEmpresa`, nuevaAsignacion, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("actualizado");
      } else {
        await axios.post('http://localhost:3000/vincularColaborador', nuevaAsignacion, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
      setModal(false);
      obtenerAsignaciones();
    } catch (error) {
      console.log(error);
    }
  }

  const dataEmpresasNombre = async () => {
    try {
      const response = await axios.get('http://localhost:3000/empresas', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setDataSelectFiltroEmpresas(response.data.map((empresa) => {
        return {
          value: empresa.nombre_comercial,
          label: empresa.nombre_comercial
        }
      }));
    } catch (error) {
      console.log(error);
    }
  }

  console.log(dataSelectFiltroEmpresas);

  const filteredAsignaciones = asignaciones.filter((asignacion) => {
    if (!searchTerm) return true;
    const valueToCheck = asignacion.nombre ? asignacion.nombre.toString().toLowerCase() : '';
    return valueToCheck.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    obtenerAsignaciones();
    dataEmpresasNombre();
  }, []);

  if (modal) {
    const inputsBase = [
      { placeholder: 'Id Colaborador', type: 'text', value: nuevaAsignacion.id_colaborador, onChange: (e) => handleChangeNuevaAsignacion(e, 'id_colaborador') },
      { placeholder: 'Id Empresa', type: 'text', value: nuevaAsignacion.id_empresa, onChange: (e) => handleChangeNuevaAsignacion(e, 'id_empresa') }
    ];

    const inputsFinales = [
      ...inputsBase
    ];

    return (
      <Modal
        tituloModal={editingId ? "Actualizar Asignación" : "Agregar Asignación"}
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
      <div className='containerAsignacionEmpresaColaboradorGeneral'>
        <div className='containerColaboradores'>
          <div className='containerAsignacionEmpresaColaborador'>
            <h1>Asignación</h1>
          </div>
          <div className='filtrosAsignacionEmpresaColaborador'>
            <Select options={dataSelectFiltroEmpresas} value={filterType} onChange={(e) => setFilterType(e.target.value)} />
            <Input placeholder="Buscar" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <BotonActivo textoBoton="Agregar Asignación" onClick={crearAsignacion} />
          </div>
          <div className='containerTable'>
            <Table idKey="id_asignacion" tabaHeaders={['Id Asignacion', 'Id Colaborador', 'Nombre Colaborador', 'Id Empresa', 'Nombre Empresa', 'Fecha Vinculacion', 'Acciones']} data={filteredAsignaciones} acciones={(asignacion) => (
              <div className='accionesColaborador'>
                <BotonActivo textoBoton="Editar" onClick={() => editarAsignacion(asignacion)} />
                <BotonActivo textoBoton="Eliminar" onClick={() => eliminarAsignacion(asignacion.id_asignacion)} />
              </div>
            )} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AsignacionEmpresaColaborador