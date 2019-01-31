import { Component } from 'react';
import { observable } from 'mobx';
import { action } from 'mobx';
import { API_KEY } from './constants/WeatherApiKey'; 


class WeatherStore extends Component {
  @observable weathers = [];

  constructor(props) {
    super(props)
    this.fetchWeathers()
  }

  @action
  fetchWeathers() {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&units=metric&q=London,us`
      )
      .then(response => {
        if(!response.ok) {
          throw Error("Network request failed")
        }
        return response
      })

      .then(data => data.json())

      .then(
          jsonData1 => jsonData1.list.slice(0, 5).map(item  => {      
          return {
            id: Math.random(),
            
            temp: item.main.temp, 
            temp_min: item.main.temp_min, 
            temp_max: item.main.temp_max, 
            pressure: item.main.pressure, 

            weatherDesc: item.weather[0].main,
            weatherIcon: item.weather[0].icon
            
          }
        })
        )
      .then(items => {
        this.weathers = items.map(i => {

          this.weathers.push(i)
          // this.weathers.push(Object.values(i))
          return this.weathers
        });
      })

  








  }
}

export default WeatherStore;