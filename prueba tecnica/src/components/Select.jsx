import React from 'react'
import PropTypes from 'prop-types'

function Select({ options, value, onChange }) {
    return (
        <select value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default Select