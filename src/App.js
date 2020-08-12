import React, { Component } from 'react';

import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import BlockSquare from './components/BlockSquare/BlockSquare';
import Footer from './components/Footer/Footer';
import ManualButton from './components/Buttons/ManualButton/index';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

  render() {
    let backdrop;

    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }

    return (
      <div style={{height: '100%'}}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backdrop}
        
        <main className="divMain">
          <div className="divImg">
          </div>
          <div className="painelManualButton">
            <ManualButton title="Luz"/>
            <ManualButton title="Fan"/>
            <ManualButton title="Irrigar"/>
            <ManualButton title="Foto"/>
          </div>
          <div className="rowBlockSquare">
           <BlockSquare title="Humidade do solo" data="75"/>
           <BlockSquare title="Temperatura"/>
           <BlockSquare title="Humidade do ar"/>
           <BlockSquare title="Nivel água"/>
           <BlockSquare title="Luz"/>
           <BlockSquare title="Ventilação"/>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;