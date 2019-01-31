import React, { Component } from 'react';
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
