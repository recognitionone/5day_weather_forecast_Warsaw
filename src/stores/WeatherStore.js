import { observable, action, decorate, computed } from 'mobx';
import { API_KEY } from '../constants/ApiKEY';
import { URL } from '../constants/ApiURL';
import { LOC } from '../constants/ApiLOCATION';
import { UNIT } from '../constants/ApiUNIT';
//TODO import { WeatherFetch } from './WeatherFetch'; 


class WeatherStore {

    weathers = {
        id: null,
        temp: null,
        tempMin: null,
        tempMax: null,
        pressure: null,
    };

    fetchWeathers(dayNum) {
        //TODO WeatherFetch (fetch API URL)
        fetch(`${ URL }?APPID=${ API_KEY }&units=${ UNIT }&q=${ LOC }`)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed")
                }
                return response
            })
            .then(data => data.json())
            .then(data => {
                (data.list.slice(dayNum, dayNum + 1).map(item => (
                    this.weathers.id = new Date(),
                    this.weathers.temp = item.main.temp,
                    this.weathers.tempMin = item.main.temp_min,
                    this.weathers.tempMax = item.main.temp_max,
                    this.weathers.pressure = item.main.pressure
                )))
            })
            .catch(err => {
                console.log('Error: ' + err);
            })
    }
}

decorate(WeatherStore, {
    weathers: observable,
    fetchWeathers: action,
});

const store = new WeatherStore();

export default store;