import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { API_KEY } from './constants/WeatherApiKey'; 

import Devtools from 'mobx-react-devtools'

class TemperatureApp {
	id = Math.random();

	@observable loading = true;
	@observable temperature0;

	@observable temperature1;
	@observable temperature2;
	@observable temperature3;
	@observable temperature4;

	

	constructor(location) {
		this.location = location;
		this.fetch()
	}

	@action
  fetch() {
    window.fetch(
    	`http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&units=metric&q=London,us`
    	)
      .then(res => res.json())
      .then(action(json => {
        this.temperature0 = json.list[0].main.temp;
        this.temperature1 = json.list[1].main.temp;
        this.temperature2 = json.list[2].main.temp;
        this.temperature3 = json.list[3].main.temp;
        this.temperature4 = json.list[4].main.temp;

        this.loading = false;
      }));
  }
}

const temps = observable([])


const PreTemperature = observer(
	['temperatures'],
	({ temperatures }) => (
		<div>
			<div>Hello fellow human</div>
			<div>Please enter the city name in the search field.</div>
			<h1> . . . </h1>
			<TemperatureInput temperatures={temperatures}/>
			{temperatures.map( t => <PreTemperatureView key={t.id} temperature={t}/>)}
			<Devtools />
		</div>
		)
	)

@observer
class TemperatureInput extends Component {
	@observable input = '';

	render() {
		return (
			<div>
				<input onChange={this.onChange}
							 value={this.input} />
				<button onClick={this.onSubmit}> Add </button>
			</div>
			)
	}

	@action onChange = (e) => {
		this.input = e.target.value
	}

	@action onSubmit = () => {
		this.props.temperatures.push(new TemperatureApp(this.input))
		this.input = ''
	}

}

@observer
class PreTemperatureView extends Component {

	render() {
		const t = this.props.temperature;
		return (
			<div>
					<div onClick={this.onTemperatureClick} >
						{t.location}: 
						{t.loading ? 'loading...' : <div>
													<div>Day 0: {t.temperature0}</div>
													<div>Day 1: {t.temperature1}</div>
													<div>Day 2: {t.temperature2}</div>
													<div>Day 3: {t.temperature3}</div>
													<div>Day 4: {t.temperature4}</div>
						
						</div>}
					
					</div>
			</div>
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