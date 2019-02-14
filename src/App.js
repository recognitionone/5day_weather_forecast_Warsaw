import React, { Component } from 'react';
import WeatherDisplay from './components/WeatherDisplay'
import { WeekDayMenu } from './components/WeekDayMenu'
// import { observable, action, decorate } from 'mobx';
import { API_KEY } from './constants/WeatherApiKey'; 


class App extends Component {

  constructor(props) {
    super(props);
    this.fetchWeathers();
    this.chooseDay = this.chooseDay.bind(this);
    this.state = {
			weathers: [],
			dayClickedWeather: null
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
    .then( data => {
    	for (var i = 0; i < 5; i++) {
    		(data.list.slice(i, i+1).map(item => (
    			this.state.weathers.push(
	          {
	            id: Math.random(),
	            temp: item.main.temp, 
	            temp_min: item.main.temp_min, 
	            temp_max: item.main.temp_max, 
	            pressure: item.main.pressure, 
	            weatherDesc: item.weather[0].main,
	            weatherIcon: item.weather[0].icon
	          })
      	)))
    	}
    })
  }

	chooseDay(newDay) {
		this.setState({ dayClickedWeather: this.state.weathers[newDay] });
	} 

  render() {
    return (
    	<div>
    		<h1>This is weather for Warsaw</h1>
	    	<WeekDayMenu onChange={this.chooseDay} />
	    	<WeatherDisplay weatherDisplayed={this.state.dayClickedWeather} />
    	</div>
    	)
  }
}

export default App;