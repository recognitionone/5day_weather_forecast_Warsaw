import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';


const today = new Date().getDay(); 
const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


@observer
class Board extends React.Component {
  @observable myData = this.props.myDataToday;
  @observable myDataForToday = null;

  @action
  handleClick(i) {
    this.myDataForToday = this.myData.slice(i, i+1);
  }
  
  @action
  renderSquare(i) {
    return (<button onClick={() => this.handleClick(i)}>{week[today + i]}</button>)
  } 

  render() {    
    return (
      <div>
        <h2>Today might be {week[today]}</h2> 
        <div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>

        <div>{!this.myDataForToday ?
          'Click any day' : 
          this.myDataForToday.map(item => 
          
            <div key={item.id}>
              <div>Temperature: {item.temp}</div>
              <div>Temperature min: {item.temp_min}</div>
              <div>Temperature max: {item.temp_max}</div>
              <div>Pressure: {item.pressure}</div>
              <div>Description: {item.weatherDesc}</div>
            </div>
            )}
        </div>
      </div>
    )
  }
}


@observer 
class WeatherDisplay extends Component {
  render() {
    return(
        <div>
          <Board myDataToday={this.props.weathers} />
        </div>
      )
  }
}

export default WeatherDisplay;




