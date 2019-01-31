import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer 
class WeatherDisplay extends Component {
  render() {
    return (
      <div>The weather: {this.props.weathers.slice(0,1).map(item => 
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

