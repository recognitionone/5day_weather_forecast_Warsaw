import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

import Devtools from 'mobx-react-devtools'


class TemperatureApp {
	id = Math.random();
	@observable unit = 'C';
	@observable temperatureCelsius = 25;
	@observable loading = true;

	constructor(location) {
		this.location = location;
		this.fetch()
	}

	@action
  fetch() {
    window.fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=83c6ba4dd07d83514536821a8a51d6d5&q=${this.location}`)
      .then(res => res.json())
      .then(action(json => {
        this.temperatureCelsius = json.main.temp - 273.15;
        this.loading = false;
      }));
  }

	@computed get temperatureKelvin() {
		return this.temperatureCelsius * (9/5) + 32
	}

	@computed get temperatureFahrenheit() {
		return this.temperatureCelsius + 273.15
	} 

	@computed get temperature() {
		switch(this.unit) {
			case 'K': return this.temperatureKelvin + ' o K'
			case 'F': return this.temperatureFahrenheit + ' o F'
			case 'C': return this.temperatureCelsius + ' o C'
			default: return this.temperatureCelsius + ' o C'
		}
	}

	@action setUnit(newUnit) {
		this.unit = newUnit;
	}

	@action setCelsius(degrees) {
		this.temperatureCelsius = degrees;
	}

	@action('update temperature and unit') setTemperatureAndUnit(degrees, unit) {
		this.setCelsius(degrees);
		this.setUnit(unit);
	}

	@action inc() {
		this.setCelsius(this.temperatureCelsius + 1)
	}
}

const temps = observable([])


const PreTemperature = observer(
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
						{t.loading ? 'loading...' : t.temperature}
					</div>
			</div>
		)
	}

	@action onTemperatureClick = () => {
		this.props.temperature.inc()
	}
}




class Temperature extends Component {
	render() {
		return (
				<PreTemperature temperatures={temps}/>
			)
	}
}

export default Temperature;