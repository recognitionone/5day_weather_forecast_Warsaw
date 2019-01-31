import React, { Component } from 'react';

import './App.css';
// import Temperatures5 from './Temperatures5';
// import ButtonExample from './ButtonExample';
import WeatherDisplay4 from './WeatherDisplay4'


class App extends Component {
  render() {
    return (
      <div >
        <WeatherDisplay4 weathers={this.props.weathers}/>
      </div>
    );
  }
}

export default App;
