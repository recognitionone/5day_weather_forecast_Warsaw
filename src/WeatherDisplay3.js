import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Provider } from 'mobx-react';
// import Today from './Today';



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
      
      myData: this.props.myDataToday,
      myDataForToday: null,
    };
  }
   
  handleClick(i) {
    console.log(i);
    console.log(this.state.myData.slice(i, i+1));

    const myDataForToday = this.state.myData.slice(i, i+1);

    this.setState ({
      myDataForToday: myDataForToday 
    })

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
        <h2>Today might be {this.state.week[this.state.today]}</h2> 
        <div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>

        <div>{!this.state.myDataForToday ?
          'loading...' : 
          this.state.myDataForToday.map(item => 
          
            <div key={item.id}>
              <div>Temperature: {item.temp}</div>
              <div>Temperature min: {item.temp_min}</div>
              <div>Temperature max: {item.temp_max}</div>
              <div>Pressure: {item.pressure}</div>
              <div>Description: {item.weatherDesc}</div>
              <div>Icon: {item.Icon}</div>
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




