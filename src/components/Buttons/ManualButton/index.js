import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ManualButton(props) {
  return (
    <button className="manualButton" onClick={props.evento}>
      <FontAwesomeIcon icon={props.icon} />
      <div className="divButton">
        {props.title}
      </div>
      {props.body}
    </button>
  );
}

export default ManualButton;