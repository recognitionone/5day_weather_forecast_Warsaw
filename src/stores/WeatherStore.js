import { observable, action, decorate, computed } from 'mobx';
import { API_KEY } from '../constants/ApiKEY'; 
import { URL } from '../constants/ApiURL'; 
import { LOC } from '../constants/ApiLOCATION'; 
import { UNIT } from '../constants/ApiUNIT'; 
// import { WeatherFetch } from './WeatherFetch'; 


class WeatherStore {

	weathers = {
		id: null,
    temp: null, 
    tempMin: null, 
    tempMax: null, 
    pressure: null, 
    // weatherDesc: null,
    // weatherIcon: null
	};

	dayClickedWeather = null;
	dayCLicked = 0;

	constructor() {
		this.fetchWeathers();
	}

	fetchWeathers() {

    fetch(`${ URL }?APPID=${ API_KEY }&units=${ UNIT }&q=${ LOC }`)
    .then(response => {
        if(!response.ok) {
          throw Error("Network request failed")
        }
        return response
      })
    .then(data => data.json())
    .then( data => {
    		(data.list.slice(this.dayCLicked, this.dayCLicked + 1).map(item => (
	          
	            this.weathers.id = new Date(),
	            this.weathers.temp = item.main.temp, 
	            this.weathers.tempMin = item.main.temp_min, 
	            this.weathers.tempMax = item.main.temp_max, 
	            this.weathers.pressure = item.main.pressure 
	            // this.weathers.weatherDesc: item.weather[0].main,
	            // this.weathers.weatherIcon: item.weather[0].icon
	          
	      )))
	  })
	  .catch (err => {
	  	console.log('Error: ' + err);
	  })
	}

  get weathersLength() {
  	// return this.weathers.length;
  	return Object.keys(this.weathers).length;
  }

}

decorate(WeatherStore, {
	weathers: observable,
	dayClickedWeather: observable,
	fetchWeathers: action,
	weathersLength: computed,
	giveMeData: action,
	dayCLicked: observable
});

const store = new WeatherStore();

export default store;