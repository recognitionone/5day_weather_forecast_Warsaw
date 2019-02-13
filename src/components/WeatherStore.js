import { Component } from 'react';
import { observable, action, decorate } from 'mobx';
import { API_KEY } from '../constants/WeatherApiKey'; 


class WeatherStore extends Component {
  weathers = observable([]);

  constructor(props) {
    super(props)
    this.fetchWeathers()
  }

  fetchWeathers() {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&units=metric&q=Warsaw`
          )
    .then(response => {
        if(!response.ok) {
          throw Error("Network request failed")
        }
        return response
      })
    .then(data => data.json())
    .then(data => (data.list.slice(0, 5).map(item => (
          {
            id: Math.random(),
            temp: item.main.temp, 
            temp_min: item.main.temp_min, 
            temp_max: item.main.temp_max, 
            pressure: item.main.pressure, 
            weatherDesc: item.weather[0].main,
            weatherIcon: item.weather[0].icon
          }
      ))))
    .then(data => data.map(item => this.weathers.push(item)))
  }
}

decorate(WeatherStore, {
  weathers: observable,
  fetchWeathers: action
});

export default WeatherStore;