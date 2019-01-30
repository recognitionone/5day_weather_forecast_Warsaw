import React, { Component } from 'react';
import { observable } from 'mobx';
import { action } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { API_KEY } from './constants/WeatherApiKey'; 


class DataDisplay1 extends Component {
  @observable stuff = [];

  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
    }
  }

  @action
  componentDidMount() {
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

      .then(() => {
        
      }
      , () => {
        this.setState({
          someData: this.temp,
          requestFailed: true
        })
      })

  }

  
  render() {
    console.log(this.state.someData)
    if (this.state.requestFailed) return <p>We failed :( ...</p>
    return (
      <div>        
        <p>loading...</p>
      </div>
    )
  }
}


export default DataDisplay1;