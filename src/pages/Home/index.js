import React, { Component } from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrop from '../../components/Backdrop/Backdrop';
import BlockSquare from '../../components/BlockSquare/BlockSquare';
import Footer from '../../components/Footer/Footer';
import ManualButton from '../../components/Buttons/ManualButton/index';
import api from '../../services/services';
import axios from 'axios';

import { faSun, faFan, faFaucet, faCamera} from '@fortawesome/free-solid-svg-icons'

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
      turnOn:true,
      date:"",
      product:""
    },
    fan:{
      turnOn:true,
      date:"",
      product:""
    },
    exhaust:{
      turnOn:true,
      date:"",
      product:""
    },
    waterBomb:{
      turnOn:true,
      date:"",
      product:""
    },
    plantImg:{
      image:"",
      plant:"",
      date:""
    },
    product: {
      serie:"",
      description:"",
      customer:"",
      date:""
    }
  };

  async componentDidMount() {
    const temp = await api.get(`/temperatures/`);
    const humidity = await api.get(`/humiditys`);
    const soil = await api.get(`/soils`);
    const floatSwitch = await api.get(`/floatSwitchs`);
    const light = await api.get(`/lights`);
    const fan = await api.get(`/fans`);
    const exhaust = await api.get(`/exhausts`);
    const waterBomb = await api.get(`/waterBombs`);
    const plantImg = await api.get(`/plantImages`);
    const product = await api.get(`/products`);

    this.setState(
      {
        temperature: temp.data[0],
        humidity: humidity.data[0],
        soil: soil.data[0],
        floatSwitch: floatSwitch.data[0],
        light: light.data[0],
        fan: light.data[0],
        exhaust: light.data[0],
        waterBomb: waterBomb.data[0],
        plantImg: plantImg.data[0],
        product: product.data[0]
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

  handleClickLight = e => {
    e.preventDefault();

    axios.post("https://node-grow.herokuapp.com/lights", 
    {
      turnOn: this.state.light.turnOn,
      product: this.state.product._id
    })
    .then(res => { console.log(res) })
    .catch(error => { console.log(error) })

    this.setState({
      light : {
        turnOn: !this.state.light.turnOn
      }
    });
  }

  handleClickFan = e => {
    e.preventDefault();

    axios.post("https://node-grow.herokuapp.com/fans", 
    {
      turnOn: this.state.fan.turnOn,
      product: this.state.product._id
    })
    .then(res => { console.log(res) })
    .catch(error => { console.log(error) })

    this.setState({
      fan : {
        turnOn: !this.state.fan.turnOn
      }
    });
  }

  handleClickWaterBomb = e => {
    e.preventDefault();

    axios.post("https://node-grow.herokuapp.com/waterBombs", 
    {
      turnOn: this.state.waterBomb.turnOn,
      product: this.state.product._id
    })
    .then(res => { console.log(res) })
    .catch(error => { console.log(error) })

    this.setState({
      waterBomb : {
        turnOn: !this.state.waterBomb.turnOn
      }
    });
  }

  render() {
    
    let backdrop;

    const { 
      temperature, humidity, soil, floatSwitch, 
      light, fan, exhaust, waterBomb, plantImg
    } = this.state;

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
            <img className="imgStyle" src={plantImg.image} alt="Foto planta"/>
            <div className="painelManualButton">
              <ManualButton 
                title="Luz" evento={this.handleClickLight}
                icon = {faSun}
                color = {this.state.light.turnOn ? "rgb(220 220 220)" : "#3fa663"}
              />
              <ManualButton title="Fan" 
                icon = {faFan} evento={this.handleClickFan}
                color = {this.state.fan.turnOn ? "rgb(220 220 220)" : "#3fa663"}
              />
              <ManualButton title="Irrigar"
                icon = {faFaucet} evento={this.handleClickWaterBomb}
                color = {this.state.waterBomb.turnOn ? "rgb(220 220 220)" : "#3fa663"}
              />
              <ManualButton title="Foto"
               icon = {faCamera}
              //  color = "rgb(220 220 220)" 
              />
            </div>
          </div>
          
          <div className="rowBlockSquare">
            <BlockSquare title="Humidade do solo" data={soil.moisture}/>
            <BlockSquare title="Temperatura" data={temperature.temperature}/>
            <BlockSquare title="Humidade do ar" data={humidity.humidity}/>
            <BlockSquare title="Nivel água" data={floatSwitch.levelWater}/>
            <BlockSquare title="Luz" data={light.turnOn===true ? "Ligado" : "Desligado"}/>
            <BlockSquare title="Ventilação" data={fan.turnOn===true ? "Ligado" : "Desligado"}/>
            <BlockSquare title="Exaustor" data={exhaust.turnOn===true ? "Ligado" : "Desligado"}/>
            <BlockSquare title="Bomba" data={waterBomb.turnOn===true ? "Ligado" : "Desligado"}/>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;