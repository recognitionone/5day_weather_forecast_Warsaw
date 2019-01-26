import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import Devtools from 'mobx-react-devtools'


const appState = observable({
  count: 0
})

appState.increment = function() {
  this.count++;
}

appState.decrement = function() {
  this.count--;
}

@observer class PreClicker extends Component {

  render() {
    return (
      <div>
        <Devtools />
        <h1>Count: {appState.count}</h1>
        <br />
        <button onClick={this.handleInc}> more </button>
        <button onClick={this.handleDec}> less </button>
      </div>
      )
  }

  handleInc = () =>{
    appState.increment();
  }

  handleDec = () =>{
    appState.decrement();
  }
}

class Clicker extends Component {
  render() {
    return (
      <PreClicker  />
      )
  }
}


export default Clicker;