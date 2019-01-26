import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

import Devtools from 'mobx-react-devtools'

//if we want to turn this class instances into an 'observable array'
//we can push, splice, add stuff etc. - like in arrays
//observable array is NOT REAL ARRAY (Array.isArray(temps)) //false

//if you need dynamically keyed collection, you can use 'observable maps'

//and we can use get, set, has

//if we want to make primitives observable (immutable - therefore not observable)
//but we can use boxed / reference value

//==============================================


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

}

const temps = observable(asMap({
	'Amsterdam': new App,
	'Rome': new App,
	'Warsaw': new App
}))

const PreTemperature = observer(
	({ temperatures }) => (
		<div>
			{temperatures.entries().map(([city, t]) => 
				<div key={t.id}>{city}: {t.temperature}</div>
				)}
			<Devtools />
		</div>
		)
	)

//const temps = observable([])

//temps.push(new App())

// const PreTemperature = observer(
// 	({ temperatures }) => (
// 		<div>
// 			{temperatures.map(t => 
// 				<div key={t.id}>{t.temperature}</div>
// 				)}
// 			<Devtools />
// 		</div>
// 		)
// 	)

class Temperature extends Component {
	render() {
		return (
			<PreTemperature temperatures={temps}/>
			)
	}
}

//TODO: add input to get temperature calculator 

export default Temperature;