import React, { Component } from 'react';
import './App.css';
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import Clicker from './Clicker';


class AppState {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  @action.bound
  reset() {
    this.timer = 0;
  }
}

const TimerView = observer(({ appState }) => (
  <button onClick={appState.reset}>Seconds passed: {appState.timer}</button>
));

class App extends Component {
  render() {
    return (
      <div className="App">
            <h1> . . . </h1>
            <TimerView appState={new AppState()} />
            <h1> . . . </h1>
            <Clicker />
            <h1> . . . </h1>
      </div>
    );
  }
}

export default App;
