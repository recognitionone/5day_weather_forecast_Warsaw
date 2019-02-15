import { observable, action, decorate, computed } from 'mobx';
import { API_KEY } from '../constants/WeatherApiKey'; 
// import { observer } from 'mobx-react';


class WeatherStore {
	weathers = [];
	dayClickedWeather = null;
	num = 0;

	constructor() {
		this.fetchWeathers();
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
    			this.weathers.push(
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



  get weathersLength() {
  	return this.weathers.length;
  }


}

decorate(WeatherStore, {
	weathers: observable,
	dayClickedWeather: observable,
	fetchWeathers: action,
	weathersLength: computed,
	giveMeData: action,
	num: observable
});

const store = new WeatherStore();

export default store;