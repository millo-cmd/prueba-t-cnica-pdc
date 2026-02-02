import React, { useEffect, useState } from 'react'
import axios from 'axios';

import '../styles/geografia.css'

import Input from '../components/Input'
import BotonActivo from '../components/BotonActivo'
import Table from '../components/Table'
import Modal from '../components/modal'
import HeaderMain from '../components/HeaderMain'

function GografiaList() {
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');
  const [geografias, setGeografias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [nuevaGeografia, setNuevaGeografia] = useState({
    pais: '',
    departamento: '',
    municipio: '',
  });

  const obtenerGeografias = async () => {
    try {
      const response = await axios.get('http://localhost:3000/geografias', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setGeografias(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarGeografia = async (id) => {
    const payload = {
      id_geografia: id
    }
    try {
      const response = await axios.delete(`http://localhost:3000/eliminarGeografia`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          data: payload
        });
      console.log(response.data);
      obtenerGeografias();
    } catch (error) {
      console.log(error);
    }
  }

  const crearGeografia = () => {
    setNuevaGeografia({
      pais: '',
      departamento: '',
      municipio: '',
    });
    setEditingId(null);
    setModal(true);
  };

  const editarGeografia = (geografia) => {
    console.log(geografia);
    setNuevaGeografia({
      id_geografia: geografia.id_geografia,
      pais: geografia.pais,
      departamento: geografia.departamento,
      municipio: geografia.municipio,
    });
    setEditingId(geografia.id_geografia);
    setModal(true);
  };

  const handleChangeNuevaGeografia = (e, field) => {
    setNuevaGeografia({
      ...nuevaGeografia,
      [field]: e.target.value
    });
  };

  const handleSave = async () => {

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/actualizarGeografia`, nuevaGeografia, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("actualizado");
      } else {
        await axios.post('http://localhost:3000/crearGeografia', nuevaGeografia, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
      setModal(false);
      obtenerGeografias();
    } catch (error) {
      console.log(error);
    }
  }

  const filteredGeografias = geografias.filter((geografia) => {
    if (!searchTerm) return true;
    const valueToCheck = geografia.pais ? geografia.pais.toString().toLowerCase() : '';
    return valueToCheck.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    obtenerGeografias();
  }, []);

  if (modal) {
    const inputsBase = [
      { placeholder: 'Pais', type: 'text', value: nuevaGeografia.pais, onChange: (e) => handleChangeNuevaGeografia(e, 'pais') },
      { placeholder: 'Departamento', type: 'text', value: nuevaGeografia.departamento, onChange: (e) => handleChangeNuevaGeografia(e, 'departamento') },
      { placeholder: 'Municipio', type: 'text', value: nuevaGeografia.municipio, onChange: (e) => handleChangeNuevaGeografia(e, 'municipio') }
    ];

    const inputsFinales = [
      ...inputsBase
    ];

    return (
      <Modal
        tituloModal={editingId ? "Editar Geografia" : "Agregar Geografia"}
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
      <div className='containerGeografiaGeneral'>
        <div className='containerColaboradores'>
          <h1>Geografia</h1>
          <div className="filtrosGeografia">
            <Input placeholder="Buscar" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <BotonActivo textoBoton="Agregar Geografia" onClick={crearGeografia} />
          </div>
          <div className="containerTable">
            <Table idKey="id_geografia" tabaHeaders={['ID', 'Pais', 'Departamento', 'Municipio', 'Acciones']} data={filteredGeografias} acciones={(geografia) => (
              <div className='accionesColaborador'>
                <BotonActivo textoBoton="Editar" onClick={() => editarGeografia(geografia)} />
                <BotonActivo textoBoton="Eliminar" onClick={() => { eliminarGeografia(geografia.id_geografia); }} />
              </div>
            )} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GografiaList