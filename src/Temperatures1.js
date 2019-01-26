import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

import Devtools from 'mobx-react-devtools'

const t = new class App {
	
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

}

//=========================
//the same without class
//we use extendObservable function
//=========================


// const t = observable({
	
// 	unit: 'C',
// 	temperatureCelsius: 25,
// 	temperatureKelvin : function() {
// 		return this.temperatureCelsius * (9/5) + 32
// 	},
// 	temperatureFahrenheit : function() {
// 		return this.temperatureCelsius + 273.15
// 	},
// 	temperature : function() {
// 		switch(this.unit) {
// 			case 'K': return this.temperatureKelvin + ' o K'
// 			case 'F': return this.temperatureFahrenheit + ' o F'
// 			case 'C': return this.temperatureCelsius + ' o C'
// 		}
// 	}

// })


const PreTemperature = observer(
	({ temperature }) => (
		<div>
			{temperature.temperature}
			<Devtools />
		</div>
		)
	)

class Temperature extends Component {
	render() {
		return (
			<PreTemperature temperature={t}/>
			)
	}
}

//TODO: add input to get temperature calculator 

export default Temperature;