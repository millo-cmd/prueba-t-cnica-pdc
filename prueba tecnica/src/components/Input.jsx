import React from 'react'
import PropTypes from 'prop-types'

function Input({ placeholder, type, value, onChange }) {
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
  )
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default Input;