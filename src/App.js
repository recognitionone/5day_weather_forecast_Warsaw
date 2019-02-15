import React, { Component } from 'react';
import WeatherDisplay from './components/WeatherDisplay'
import { WeekDayMenu } from './components/WeekDayMenu'
// import { observable, action, decorate } from 'mobx';
import { API_KEY } from './constants/WeatherApiKey'; 
import { inject, observer } from 'mobx-react';

const App = inject('WeatherStore')(observer(

  

class App extends Component {


  constructor(props) {
    super(props);
    this.chooseDay = this.chooseDay.bind(this);
  }


	chooseDay(newDay) {
    console.log(newDay);
    this.props.WeatherStore.num = newDay;
  }
 


  render() {
    const {WeatherStore} = this.props;

    return (
    	<div>
        <h1>This is weather for Warsaw</h1>
    		<h1>You have {WeatherStore.weathersLength} days</h1>
	    	<WeekDayMenu onChange={this.chooseDay} />
	    	<WeatherDisplay weatherDisplayed={WeatherStore.weathers[WeatherStore.num]} />
    	</div>
    	)
    }
  }

))

export default App;