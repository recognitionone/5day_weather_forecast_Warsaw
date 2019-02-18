import React, { Component } from 'react';

const today = new Date().getDay(); 
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export class WeekDayMenu extends Component {

  handleClick = (e) => {
    const whichDay = e.target.id;
    this.props.onChange(whichDay);
  }
  
  createTable() {
    let days = []
    for (let j = 0; j < 5; j++) {
      days.push(<button onClick={this.handleClick} id={j} key={j}> { weekDays[(today + j) % 7] } </button>)
    }
    return days
  }

  render() {    
    return (
      <div>
        {this.createTable()}
      </div>
    )
  }
}


