import React, { Component } from 'react';

import './App.css';
// import Temperatures5 from './Temperatures5';
// import ButtonExample from './ButtonExample';
import WeatherDisplay3 from './WeatherDisplay3'


class App extends Component {
  render() {
    return (
      <div >
        <WeatherDisplay3 weathers={this.props.weathers}/>
      </div>
    );
  }
}

export default App;
