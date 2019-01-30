import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { API_KEY } from './constants/WeatherApiKey'; 

import Devtools from 'mobx-react-devtools'

class TemperatureApp {
  id = Math.random();

  @observable loading = true;
  @observable temperature0 = [];

  // @observable temperature1;
  // @observable temperature2;
  // @observable temperature3;
  // @observable temperature4;

  

  constructor() {
    this.fetch()
  }

  @action
  fetch() {
    window.fetch(
      `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&units=metric&q=London,us`
      )
      .then(res => res.json())
      // .then(action(json => {
      //   this.temperature0 = json.list[0].main.temp;
      //   this.temperature1 = json.list[1].main.temp;
      //   this.temperature2 = json.list[2].main.temp;
      //   this.temperature3 = json.list[3].main.temp;
      //   this.temperature4 = json.list[4].main.temp;

      //   this.loading = false;
      // }));
      .then(jsonData => jsonData.list.slice(0,5).map(item  => {
      
          return {
            temp: item.main.temp, 
            temp_min: item.main.temp_min, 
            temp_max: item.main.temp_max, 
            pressure: item.main.pressure, 

            weatherDesc: item.weather[0].main,
            weatherIcon: item.weather[0].icon
          }
        }))
      .then(action(jsonData => {
        this.temp.map(i => {this.temperature0.push(i)}) 
      }))
  }
}

const temps = observable([])


const PreTemperature = observer(
  ['temperatures'],
  ({ temperatures }) => (
    <div>
      <TemperatureInput temperatures={temperatures}/>
      {temperatures.map( t => <PreTemperatureView key={t.id} temperature={t}/>)}
      <Devtools />
    </div>
    )
  )

@observer
class TemperatureInput extends Component {
  render() {
    return (
      <div>
        <button onClick={this.onSubmit}> Add </button>
      </div>
      )
  }

  @action onSubmit = () => {
    this.props.temperatures.push(new TemperatureApp(this.input))
  }

}

@observer
class PreTemperatureView extends Component {

  render() {
    const t = this.props.temperature;
    return (
      <div>Day 0: {t.temperature0}</div>
    )
  }
}


class Temperature extends Component {
  render() {
    return (
      <Provider temperatures={temps}>
        <PreTemperature />
      </Provider>
      )
  }
}

export default Temperature;