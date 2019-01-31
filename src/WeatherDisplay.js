import React, { Component } from 'react';
// import { observable } from 'mobx';
// import { action } from 'mobx';
import { observer } from 'mobx-react';
// import { API_KEY } from './constants/WeatherApiKey'; 
// import WeatherStore from './WeatherStore'


@observer 
class WeatherDisplay extends Component {
  render() {

    return (
      <div>The weather: {this.props.weathers.map(item => 
        <div key={item.id}>
          <div>Temperature: {item.temp}</div>
          <div>Temperature min: {item.temp_min}</div>
          <div>Temperature max: {item.temp_max}</div>
          <div>Pressure: {item.pressure}</div>
          <div>Description: {item.weatherDesc}</div>
          <div>Icon: {item.Icon}</div>
          <div>. . . . </div>
        </div>
        )}
      </div>
      )
  }
}

export default WeatherDisplay;