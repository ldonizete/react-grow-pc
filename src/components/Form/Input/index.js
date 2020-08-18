import React from 'react';
import './index.css';

function Input(props) {
  return (
    <>
      <div className="divInput">
        <label htmlFor="labelInput">{props.name}</label>
        <input
          className={props.className}
          placeholder={props.placeholder}
          type="text"
          name={props.name}
          noValidate
        />
      </div>
    </>
  );
}

export default Input;