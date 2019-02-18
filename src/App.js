import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// import WeatherDisplay from './components/WeatherDisplay'
import { WeekDayMenu } from './components/WeekDayMenu'
import { LOC } from './constants/ApiLOCATION'; 


class App extends Component {

	chooseDay = (newDay) => {
    //TODO compute clicked day number in WeatherStore
    this.props.weatherStore.fetchWeathers(newDay);
  }
  
  render() {
    const {weatherStore} = this.props;
    return (
    	<div>
        <h1>This is weather for {LOC}</h1>
	    	<WeekDayMenu onChange={this.chooseDay} />
            {/* TODO Export this data table to WeatherDisplay */}
            <div key={weatherStore.weathers.id}>
              <div>Temperature:     {weatherStore.weathers.temp}       </div>
              <div>Temperature min: {weatherStore.weathers.tempMin}   </div>
              <div>Temperature max: {weatherStore.weathers.tempMax}   </div>
              <div>Pressure:        {weatherStore.weathers.pressure}   </div>
            </div>
    	</div>
    	)
    }
  }

export default inject('weatherStore')(observer(App));