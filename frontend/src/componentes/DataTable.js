import React from 'react';

const DataTable = ({ data }) => {
  // Función para calcular la suma total de una columna
  const calcularTotalColumna = (indiceColumna) => {
    return data.reduce((total, fila) => total + fila.valores[indiceColumna], 0);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Categoría</th>
          {/* Encabezados de columna */}
          {data[0].valores.map((valor, index) => (
            <th key={index}>Columna {index + 1}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {/* Filas de datos */}
        {data.map((fila, index) => (
          <tr key={index}>
            <td>{fila.categoria}</td>
            {fila.valores.map((valor, index) => (
              <td key={index}>{valor}</td>
            ))}
            {/* Celda de total por fila */}
            <td>{fila.valores.reduce((total, valor) => total + valor, 0)}</td>
          </tr>
        ))}
        {/* Última fila para mostrar la suma total de cada columna */}
        <tr>
          <td>Total</td>
          {data[0].valores.map((valor, index) => (
            <td key={index}>{calcularTotalColumna(index)}</td>
          ))}
          {/* Celda de suma total */}
          <td>{calcularTotalColumna(0)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DataTable;