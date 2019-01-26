import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';


class AppState {
  @observable count = 0;

  @action.bound
  increment() {
    this.count++;
    console.log(this.count);
  }

  @action.bound
  decrement() {
    this.count--;
    console.log(this.count);
  }
}

const TimerView = observer(({ appState }) => (
  <div>
    <h1>Count: {appState.count}</h1>
    <br />
    <button onClick={appState.increment}> more </button>
    <button onClick={appState.decrement}> less </button>
  </div>
));

class Clicker extends Component {
  render() {
    return (
      <div>
        <TimerView appState={new AppState()} />
        
      </div>
    )
  }

}

export default Clicker;