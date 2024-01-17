import React from 'react';

const MapLegend = ({ leyendas }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Leyendas del Mapa</h3>
      <div style={{ display: 'flex' }}>
        {leyendas.map((leyenda, index) => (
          <div key={index} style={{
            marginRight: '0px',
            alignContent: 'center',
            alignItems: 'center',
            alignTracks: 'center',
            fontSize: 30,
            }}>
            <span
              style={{
                backgroundColor: leyenda.color,
                width: '30px',
                height: '30px',
                display: 'inline-block',
                marginRight: '5px',
                marginLeft: '5px',
                alignContent: 'center',
                alignTracks: 'center',
              }}
            ></span>
            {leyenda.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;