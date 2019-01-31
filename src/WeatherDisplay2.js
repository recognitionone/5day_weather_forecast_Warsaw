import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import Today from './Today';

class Today extends Component {
  render() {
  var today = new Date().getDay();
  var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    return (
      <div>
      <h2>It might be {week[today]}</h2> 
      </div>
      )
  }
}

function Square (props) {
    return (
      <button onClick={props.onClick}>
        {props.boardText}
      </button> 
    )
}






class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareNumbers: Array(5).fill(" day "),
      today: new Date().getDay(),
      week: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    };
  }
   
  
  renderSquare(i) {
    return <Square  
             boardText={this.state.week[this.state.today + i]}
             onClick={() => this.handleClick(i)}
             />
  }
  
  render() {    
    return (
      <div>
        <div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>        
      </div>
    )
  }
}

function DayForecast(props) {
  let dailyData = props.data;
  return (
      <div>
        The weather for: {props.todayIs}
        what we got:
        {props.otherData}


             
      </div>
      )
}

@observer 
class WeatherDisplay extends Component {

  render() {
    return(
        <div>
          <Today />
          <Board />
          <DayForecast todayIs={0} data={this.props.weathers} otherData={"Today is Thursday"} />
          
          <div>The weather: {this.props.weathers.slice(2,4).map(item => 
          
            <div key={item.id}>
              <div>Temperature: {item.temp}</div>
              <div>Temperature min: {item.temp_min}</div>
              <div>Temperature max: {item.temp_max}</div>
              <div>Pressure: {item.pressure}</div>
              <div>Description: {item.weatherDesc}</div>
              <div>Icon: {item.Icon}</div>
              <div>. . . . </div>
            </div>
            )}
          </div>
        
        </div>
      )
  }
}

export default WeatherDisplay;




