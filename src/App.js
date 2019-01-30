import React, { Component } from 'react';

import './App.css';
// import Temperatures5 from './Temperatures5';
// import ButtonExample from './ButtonExample';
import WeatherDisplay from './WeatherDisplay'


class App extends Component {
  render() {
    return (
      <div >
        <WeatherDisplay weathers={this.props.weathers}/>
      </div>
    );
  }
}

export default App;
