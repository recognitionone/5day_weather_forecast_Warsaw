import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

// function Square (props) {
//     return (<button onClick={props.onClick}> {props.boardText}</button>)
// }

const today = new Date().getDay(); 
const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


@observer
class Board extends React.Component {
  @observable myData = this.props.myDataToday;
  @observable myDataForToday = null;

  // constructor(props) {
  //   super(props);
  //   this.state = {
      // squareNumbers: Array(5).fill(" day "),
      // today: new Date().getDay(),
      // week: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      
      // myData: this.props.myDataToday,
      // myDataForToday: null,
  //   };
  // }
   
  handleClick(i) {
    // const myDataForToday = this.state.myData.slice(i, i+1);
    // this.setState ({
    //   myDataForToday: myDataForToday 
    // })

    this.myDataForToday = this.myData.slice(i, i+1);
    
       
    

  }
  
  renderSquare(i) {
    return (
              // <Square  
             // boardText={this.state.week[this.state.today + i]}
             // boardText={week[today + i]}
             // onClick={() => this.handleClick(i)}
             // />
             <button onClick={() => this.handleClick(i)}>{week[today + i]}</button>
            )
  } 

  render() {    
    return (
      <div>
 {/*       <h2>Today might be {this.state.week[this.state.today]}</h2> */}
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




