import React, { Component } from 'react';
import { observable, action, decorate } from 'mobx';
import { observer } from 'mobx-react';


const WeatherDisplay = observer(class WeatherDisplay extends React.Component {

  weather = this.props.weathers;
  weatherForThatDay = this.props.weathers;

  render() {    
    return (
        <div>{!this.weatherForThatDay ?
          'Click any day' : 
          this.weatherForThatDay.map(item => 
          
            <div key={item.id}>
              <div>Temperature:     {item.temp}       </div>
              <div>Temperature min: {item.temp_min}   </div>
              <div>Temperature max: {item.temp_max}   </div>
              <div>Pressure:        {item.pressure}   </div>
              <div>Description:     {item.weatherDesc}</div>
            </div>
            )}
        </div>
    )
  }
})


decorate(WeatherDisplay, {
  weather: observable,
  weather: observable,
  weatherForThatDay: observable,
  handleClick: action,
  renderWeekButton: action
});




export default WeatherDisplay;