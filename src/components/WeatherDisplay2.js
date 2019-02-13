import React, { Component } from 'react';
import { observable, action, decorate } from 'mobx';
import { observer } from 'mobx-react';

const today = new Date().getDay(); 
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Board = observer(class Board extends React.Component {

  weather = this.props.weathers;
  weatherForThatDay = null;

  handleClick(i) {
    this.weatherForThatDay = this.weather.slice(i, i+1);
  }
  
  renderWeekButton(i) {
    return(<button onClick={() => this.handleClick(i)}> { weekDays[(today + i) % 7] } </button>)
   } 

  render() {    
    return (
      <div>
        <h2>Today might be {weekDays[today % 7]} in Warsaw...</h2> 
        <div>
          {this.renderWeekButton(0)}
          {this.renderWeekButton(1)}
          {this.renderWeekButton(2)}
          {this.renderWeekButton(3)}
          {this.renderWeekButton(4)}
        </div>

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
      </div>
    )
  }
})


decorate(Board, {
  weather: observable,
  weather: observable,
  weatherForThatDay: observable,
  handleClick: action,
  renderWeekButton: action
});


class WeatherDisplay extends Component {
  render() {
    return(
        <div>
          <Board weathers={this.props.weathers} />
        </div>
      )
  }
}

export default WeatherDisplay;