import { observable, autorun } from "mobx";

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
