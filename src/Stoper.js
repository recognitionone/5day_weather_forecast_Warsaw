import { observable, autorun } from "mobx";
import React from "react";
import { render } from "react-dom";
import { observable, autorun } from "mobx";
import { observer } from "mobx-react";

const stopWatch = observable({
  start: Date.now(),
  now: Date.now(),
  // introduce a computed value by defining a `getter property`
  get elapsed() {
    const elapsed = Math.max(0, this.now - this.start);
    return `${Math.floor(elapsed / 1000)}s ${elapsed % 1000}ms.`;
  }
});

function paint() {
  document.body.innerHTML = `<span>${stopWatch.elapsed}</span>`;
}

autorun(() => {
  paint();
});

const tick = () => {
  stopWatch.now = Date.now();
};

setInterval(tick, 10);


//===================================



class Timer {
  @observable timer1 = 0;
  @observable timer2 = 0;

  constructor() {
    setInterval(() => {
      this.timer1 += 1;
    }, 1000);
    setInterval(() => {
      this.timer2 += 5;
    }, 5000);
  }
}

const timer = new Timer();

function printState(timer) {
  console.log(timer.timer1);
}

autorun(() => {
  printState(timer);
});

const TimerView = observer(({ timer }) => (
  <button >Seconds passed: {timer.timer1}</button>
));

render(
  <div>
    <TimerView timer={timer} />
  </div>,
  document.getElementById("root")
);


//============================================



import React from "react";
import { render } from "react-dom";
import { observable, action, reaction } from "mobx";
import { observer, inject, Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";

class AppState {
  @observable timer = 0;
  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
    this.r = reaction(
      () => this.timer,
      val => {
        this.doStuff("r: ", val);
      }
    );
  }

  @action.bound
  reset() {
    this.timer = 0;
  }

  _r = reaction(
    () => this.timer,
    val => {
      this.doStuff("_r: ", val);
    }
  );

  doStuff(tag, val) {
    console.log(tag, val);
  }
}

const appState = new AppState();

@inject("appState")
@observer
class TimerView extends React.Component {
  constructor(props) {
    super(props);
    this.appState = this.props.appState;
    //this.getReaction = this.getReaction.bind(this);

    //  comment/uncomment the next line of code
    // this.r = this.getReaction(); // a working bound reaction
  }

  @observable style = {};
  _r = this.getReaction(); // should this work?? Is there a way to bind this method?

  getReaction() {
    return reaction(
      () => appState.timer % 2,
      val => {
        appState.doStuff("React bound reaction: ", val);
        if (val === 0) {
          this.style = { backgroundColor: "pink" };
        } else {
          this.style = { backgroundColor: "blue" };
        }
      }
    );
  }
  render() {
    return (
      <button onClick={this.appState.reset} style={this.style}>
        Seconds passed: {this.appState.timer}
      </button>
    );
  }
}

render(
  <Provider appState={new AppState()}>
    <div>
      <TimerView />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById("root")
);
