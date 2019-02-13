import React, { Component } from 'react';
import WeatherDisplay from './components/WeatherDisplay'


class App extends Component {
  render() {
    return <WeatherDisplay weathers={this.props.weathers}/>
  }
}

export default App;
