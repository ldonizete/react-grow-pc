import React, { Component } from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrop from '../../components/Backdrop/Backdrop';
import BlockSquare from '../../components/BlockSquare/BlockSquare';
import Footer from '../../components/Footer/Footer';
import ManualButton from '../../components/Buttons/ManualButton/index';
import api from '../../services/services';

class Home extends Component {
  state = {
    sideDrawerOpen: false,
    temperature: {
      temperature:"",
      date:"",
      product:""
    },
    humidity:{
      humidity:"",
      date:Date,
      product:""
    },
    soil:{
      moisture:"",
      product:"",
      date:""
    },
    floatSwitch:{
      levelWater:"",
      date:"",
      product:""
    },
    light:{
      turnOn:Boolean,
      date:"",
      product:""
    },
    fan:{
      turnOn:Boolean,
      date:"",
      product:""
    },
    exhaust:{
      turnOn:Boolean,
      date:"",
      product:""
    },
  };

  async componentDidMount() {
    const temp = await api.get(`/temperatures/`);
    const humidity = await api.get(`/humiditys`);
    const soil = await api.get(`/soils`);
    const floatSwitch = await api.get(`/floatSwitchs`);
    const light = await api.get(`/lights`);
    const fan = await api.get(`/fans`);
    const exhaust = await api.get(`/exhausts`);
    
    this.setState(
      {
        temperature: temp.data[0],
        humidity: humidity.data[0],
        soil: soil.data[0],
        floatSwitch: floatSwitch.data[0],
        light: light.data[0],
        fan: fan.data[0],
        exhaust: exhaust.data[0],
      }
    )
  }

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

    const { 
      temperature, humidity, soil, 
      floatSwitch, light, fan, exhaust 
    } = this.state;

    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
    console.log(6,fan);
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
            <BlockSquare title="Humidade do solo" data={soil.moisture}/>
            <BlockSquare title="Temperatura" data={temperature.temperature}/>
            <BlockSquare title="Humidade do ar" data={humidity.humidity}/>
            <BlockSquare title="Nivel água" data={floatSwitch.levelWater}/>
            <BlockSquare title="Luz" data={light.turnOn===true ? "Ligado" : "Desligado"}/>
            <BlockSquare title="Ventilação" data={fan.turnOn===true ? "Ligado" : "Desligado"}/>
            <BlockSquare title="Exaustor" data={exhaust.turnOn===true ? "Ligado" : "Desligado"}/>
            <BlockSquare title="Bomba" data={light.turnOn===true ? "Ligado" : "Desligado"}/>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;