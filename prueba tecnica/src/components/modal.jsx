import React from 'react'

import BotonActivo from './BotonActivo'
import Input from './Input'

import '../styles/components.css'

function modal({ tituloModal, textoBotonModal, onClick, inputs, textoBotonModalGuardar, onClickGuardar }) {
    return (
        <div className='containerModalGeneral'>
            <div className='containerModal'>
                <div className='containerModalHeader'>
                    <h2>{tituloModal}</h2>
                    <span className='botonCerrar' onClick={onClick}>{textoBotonModal}</span>
                </div>
                <div className='containerModalBody'>
                    {inputs.map((input) => (
                        <Input key={input.placeholder} placeholder={input.placeholder} type={input.type} value={input.value} onChange={input.onChange} />
                    ))}
                </div>
                <div className='containerModalFooter'>
                    <BotonActivo textoBoton={textoBotonModalGuardar} onClick={onClickGuardar} />
                </div>
            </div>
        </div>
    )
}

export default modal