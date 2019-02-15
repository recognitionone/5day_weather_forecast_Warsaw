import React, { Component } from 'react';

const today = new Date().getDay(); 
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export class WeekDayMenu extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const whichDay = e.target.id;
    this.props.onChange(whichDay);
  }
  
  renderWeekButton(i) {
      return <button onClick={this.handleClick} id={i} > { weekDays[(today + i) % 7] } </button>
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
}