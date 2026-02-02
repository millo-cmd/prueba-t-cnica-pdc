import React from 'react'

function Table({ tabaHeaders, data, acciones, idKey = 'id_colaborador' }) {
    return (
        <table>
            <thead>
                <tr>
                    {tabaHeaders.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item[idKey]}>
                        {Object.values(item).map((value) => (
                            <td key={Math.random() * 100}>{value}</td>
                        ))}
                        <td key={`actions-${item[idKey]}`}>
                            {acciones(item)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table