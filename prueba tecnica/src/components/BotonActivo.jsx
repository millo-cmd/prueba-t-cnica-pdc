import React from 'react'
import PropTypes from 'prop-types'

function BotonActivo({ textoBoton, onClick }) {
  return (
    <button className='botonActivo' onClick={onClick}>{textoBoton}</button>
  )
}

BotonActivo.propTypes = {
  textoBoton: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default BotonActivo