import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

import Devtools from 'mobx-react-devtools'


class App {
	id = Math.random();
	@observable unit = 'C';
	@observable temperatureCelsius = 25;

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
temps.push(new App())
temps.push(new App(25, 'F'))
temps.push(new App(40, 'C'))
temps.push(new App(20, 'K'))
temps.push(new App(25, 'F'))
temps.push(new App(40, 'C'))

const PreTemperature = observer(({ temperatures }) => (
		<div>
			{temperatures.map( t => <PreTemperatureView key={t.id} temperature={t}/>)}
			<Devtools />
		</div>
		)
	)

@observer
class PreTemperatureView extends Component {

	render() {
		const t = this.props.temperature;
		return (
			<div>
					<div onClick={this.onTemperatureClick} >
						{t.temperature}
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