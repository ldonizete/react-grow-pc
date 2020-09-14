import React, { Component } from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrop from '../../components/Backdrop/Backdrop';
import BlockSquare from '../../components/BlockSquare/BlockSquare';
import Footer from '../../components/Footer/Footer';
import ManualButton from '../../components/Buttons/ManualButton/index';
import api from '../../services/services';
import axios from 'axios';

import { faLightbulb, faFan, faFaucet, faCamera} from '@fortawesome/free-solid-svg-icons'

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
    },
    plant: {
      id:"",
    }
  };

  async componentDidMount() {
    const temp = await api.get(`/temperatures/`);
    const humidity = await api.get(`/humiditys`);
    const soil = await api.get(`/soils`);
    const floatSwitch = await api.get(`/floatSwitchs`);
    const light = await api.get(`/lights`);
    const fan = await api.get(`/fans`);
    const waterBomb = await api.get(`/waterBombs`);
    const plantImg = await api.get(`/plantImages`);
    const product = await api.get(`/products`);
    const plant = await api.get(`/plants`);

    

    this.setState(
      {
        temperature: temp.data[0],
        humidity: humidity.data[0],
        soil: soil.data[0],
        floatSwitch: floatSwitch.data[0],
        light: light.data[0],
        fan: fan.data[0],
        waterBomb: waterBomb.data[0],
        plantImg: plantImg.data[0],
        product: product.data[0],
        plant: plant.data[0]
      }
    )
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

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
      turnOn: !this.state.light.turnOn,
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
      turnOn: !this.state.fan.turnOn,
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
      turnOn: !this.state.waterBomb.turnOn,
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

  handleClickTakePhoto = e => {
    e.preventDefault();

    axios.post("https://node-grow.herokuapp.com/plantImages",
    {
      turnOn:true,
      plant:this.state.plant._id
    })
    .then(res => { console.log(res) })
    .catch(error => { console.log(error) })
  }

  render() {
    
    let backdrop;

    const { 
      temperature, humidity, soil, floatSwitch, plantImg
    } = this.state;

    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }

    // setInterval(window.location.reload(), 30000);

    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backdrop}
        <main className="divMain">
          <div className="divImg">
            <div 
              className="imgStyle" 
              style={{backgroundImage:`url(${plantImg.image})`}}>
                <div className="painelManualButton">
                  <ManualButton 
                    title="Luz" evento={this.handleClickLight}
                    icon = {faLightbulb}
                    color = {this.state.light.turnOn ? "manualButton green" : "manualButton"}
                  />
                  <ManualButton title="Fan" 
                    icon = {faFan} evento={this.handleClickFan}
                    color = {this.state.fan.turnOn ? "manualButton green" : "manualButton"}
                  />
                  <ManualButton title="Irrigar"
                    icon = {faFaucet} evento={this.handleClickWaterBomb}
                    color = {this.state.waterBomb.turnOn ? "manualButton green" : "manualButton"}
                  />
                  <ManualButton title="Foto"
                    icon = {faCamera} evento={this.handleClickTakePhoto}
                    color = "manualButton"
                  />
              </div>
            </div>
            
            <div className="containerPainel">
              <label className="labelPainel">Painel de Monitoramento</label>
              <div className="rowBlockSquare">
                <BlockSquare title="HUMIDADE DO SOLO" data={soil.moisture}/>
                <BlockSquare title="TEMPERATURA" data={temperature.temperature}/>
                <BlockSquare title="HUMIDADE DO AR" data={humidity.humidity}/>
                <BlockSquare title="NIVEL ÁGUA" data={floatSwitch.levelWater}/>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;