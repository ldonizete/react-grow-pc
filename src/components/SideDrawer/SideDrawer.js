import React from 'react';

import './SideDrawer.css';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if(props.show) {
    drawerClasses = 'side-drawer open'
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li><a href="/">Painel</a></li>
        <li><a href="/">Configurações</a></li>
        <li><a href="/">Relatório</a></li>
      </ul>
    </nav>
  );
};

export default sideDrawer;