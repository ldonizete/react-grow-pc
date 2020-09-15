import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ManualButton(props) {
  return (
    <button className={props.color}
      onClick={props.evento}
    >
      <FontAwesomeIcon icon={props.icon} style={{width:'25px', height:'25px'}}/>
      <div className="divButton">
        {props.title}
      </div>
      {props.body}
    </button>
  );
}

export default ManualButton;