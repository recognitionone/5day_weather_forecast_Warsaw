import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';



observer(class Clicker extends Component {

  count = observable(0);

  increment = () => {
    this.count++;
  }

  decrement = () => {
    this.count--;
  }


  render() {
    return (
      <div>
        <h1>Count: {this.count}</h1>
        <br />
        <button onClick={this.increment}> more </button>
        <button onClick={this.decrement}> less </button>
      </div>
      )
  }
});


export default Clicker;
