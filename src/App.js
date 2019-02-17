import React, { Component } from 'react';
import WeatherDisplay from './components/WeatherDisplay'
import { WeekDayMenu } from './components/WeekDayMenu'
import { inject, observer } from 'mobx-react';
import { LOC } from './constants/ApiLOCATION'; 


const App = inject('weatherStore')(observer( 

class App extends Component {
  constructor(props) {
    super(props);
    this.chooseDay = this.chooseDay.bind(this);
  }

	chooseDay(newDay) {
    this.props.weatherStore.dayCLicked = newDay;
    console.log(this.props.weatherStore.weathers.id);
    console.log(this.props.weatherStore.weathers.temp);
    console.log(this.props.weatherStore.weathers.tempMin);
    console.log(this.props.weatherStore.weathers.tempMax);
    console.log(this.props.weatherStore.weathers.pressure);
    console.log(newDay);
  }

  render() {
    const {weatherStore} = this.props;

    return (
    	<div>
        <h1>This is weather for {LOC}</h1>
    		<h1>You have {weatherStore.weathersLength} days</h1>
	    	<WeekDayMenu onChange={this.chooseDay} />
	    	<WeatherDisplay weatherDisplayed={this.props.weatherStore.weathers.temp} />
    	</div>
    	)
    }
  }

))

export default App;


        // <WeatherDisplay weatherDisplayed={weatherStore.weathers[weatherStore.num]} />
