import React, { Component } from 'react';
import { observable, action, decorate } from 'mobx';
import { observer } from 'mobx-react';

const today = new Date().getDay(); 
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const WeekDayMenu = observer(class WeekDayMenu extends React.Component {

  // weather = this.props.weathers;
  // weatherForThatDay = null;
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const newForecastSlice = this.props.weathers.slice(i, i+1);
    console.log(this.props.weathers.slice(i, i+1));
    // this.props.onChange(newForecastSlice)
    // TODO: pass newForecastSlice to parent and use it to display forecast

    // this.weatherForThatDay = this.weather.slice(i, i+1);
  }
  
  renderWeekButton(i) {
    return <button onClick={this.handleClick} value={i} > { weekDays[(today + i) % 7] } </button>
   } 

  render() {    
    return (
        <div>
          {this.renderWeekButton(0)}
          {this.renderWeekButton(1)}
          {this.renderWeekButton(2)}
          {this.renderWeekButton(3)}
          {this.renderWeekButton(4)}
        </div>
    )
  }
})


decorate(WeekDayMenu, {
  weather: observable,
  weather: observable,
  weatherForThatDay: observable,
  handleClick: action,
  renderWeekButton: action
});


