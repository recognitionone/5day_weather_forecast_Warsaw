import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import React from "react";

const appState = observable({
  count: 0
})
appState.increment = function () {
  this.count++;
}
appState.decrement = function () {
  this.count--;
}

@observer class Clicker extends Component {
  render() {
    return (
      <div>
        Counter {this.props.store.count} <br />
        <button onClick={this.handleInc}> + </button>
        <button onClick={this.handleDec}> - </button>
      </div>
    )
  }

  handleInc = () => {
    this.props.store.increment()
  }

  handleDec = () => {
    this.props.store.decrement()
  }
}

export default Clicker;