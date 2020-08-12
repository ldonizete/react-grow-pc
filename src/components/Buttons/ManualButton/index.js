import React from 'react';
import './index.css';

function ManualButton(props) {
  return (
    <div className="manualButton">
      {props.title}
    </div>
  );
}

export default ManualButton;