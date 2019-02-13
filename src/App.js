import React, { Component } from 'react';
// import WeatherDisplay from './components/WeatherDisplay'
// import { WeekDayMenu } from './components/WeekDayMenu'
// import WeatherStore from './components/WeatherStore'
import { observable, action, decorate } from 'mobx';
import { API_KEY } from './constants/WeatherApiKey'; 


class App extends Component {

  constructor(props) {
    super(props);
    this.fetchWeathers();
    this.chooseDay = this.chooseDay.bind(this);
    this.state = {
			weathers: [],
		}; 
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
    .then(data => data.map(item => this.state.weathers.push(item)))
  }

	chooseDay(newDay) {
		this.setState({ weathers: newDay })
	} 



  render() {
  	

  	console.log(this.state.weathers);
    return (
    	<div>
    	Hello
    	</div>
    	)

  }
}

export default App;


// <WeatherDisplay weathers={this.state.weatherStore} />

//     		<WeekDayMenu 
//     					weathers={this.state.weatherStore} 
//     					onChange={this.chooseDay} />