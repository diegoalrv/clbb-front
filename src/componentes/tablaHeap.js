import React from 'react';

const TableComponent = ({ data }) => {
  if ( !data || !data.indicadores) {
    console.log("hola---- SIN DATOS")
    return null; // O puedes manejarlo de otra manera según tus necesidades
  }

  // Función para obtener el color en la escala de azules basado en el valor
  const getBlueScaleColor = (value) => {
    // Ajusta estos valores según tu preferencia
    const minColorValue = 0; // Valor mínimo para el color más claro
    const maxColorValue = 100; // Valor máximo para el color más oscuro
    const saturation = 80; // Saturación del color

    // Escala de color en formato HSL (Hue, Saturation, Lightness)
    const hue = 240 - Math.round((value - minColorValue) / (maxColorValue - minColorValue) * 120); // Ajusta 120 según tu preferencia
    const lightness = 50; // Ajusta la luminosidad según tu preferencia

    // Convierte HSL a RGB
    const rgbColor = hslToRgb(hue, saturation, lightness);

    // Devuelve el color en formato RGB
    return `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
  };

  // Función para convertir HSL a RGB
  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // A tono de gris
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  // Calcula los totales por columna
  const columnTotals = data.indicadores.map((indicador, index) => {
    const total = data.ciudades.reduce((sum, ciudad) => sum + ciudad.valores[index], 0);
    return total;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Ciudades</th>
          {data.indicadores.map((indicador, index) => (
            <th key={index}>{indicador}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.ciudades.map((ciudad, ciudadIndex) => (
          <tr key={ciudadIndex}>
            <td>{ciudad.nombre}</td>
            {ciudad.valores.map((valor, valorIndex) => (
              <td key={valorIndex} style={{ backgroundColor: getBlueScaleColor(valor) }}>{valor}</td>
            ))}
            <td>{columnTotals[ciudadIndex]}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          {columnTotals.map((total, index) => (
            <td key={index}>{total}</td>
          ))}
          <td>{columnTotals.reduce((sum, total) => sum + total, 0)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TableComponent;