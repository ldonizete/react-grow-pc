import React from 'react';
import './BlockSquare.css';

const blockSquare = props => (
  <div className="blockSquare">
    <label className="lblTitulo">{props.title}</label>
    <div>
      <label className="lblCount">
        {
          (props.data !== null || props.data !== undefined)
          ? props.data
          : 0
        }%
      </label>
    </div>
  </div>
  
);

export default blockSquare;
