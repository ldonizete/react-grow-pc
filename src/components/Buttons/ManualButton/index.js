import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ManualButton(props) {
  return (
    <button className="manualButton" 
      onClick={props.evento}
      style={{background:props.color}}
    >
      <FontAwesomeIcon icon={props.icon} style={{width:'32px', height:'32px'}}/>
      <div className="divButton">
        {props.title}
      </div>
      {props.body}
    </button>
  );
}

export default ManualButton;