import React, { Component } from 'react';
import { observable } from 'mobx';
import { action } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { API_KEY } from './constants/WeatherApiKey'; 
import WeatherStore from './WeatherStore'


@observer 
class WeatherDisplay extends Component {
  render() {

    return (
      <div>The weather: {this.props.weathers.map(item => 
        <div key={item.id}>{item.temp}</div>
        )}
      </div>
      )
  }
}

export default WeatherDisplay;