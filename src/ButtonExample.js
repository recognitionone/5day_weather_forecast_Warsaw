import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

@observer class MyComponent extends React.Component {

  @observable active = false;
  @observable observable1;
  @observable observable2;

  myMethod = () => {
    action(() => {
      this.observable1 = true;
      this.observable2 = 'observable2';
    })();
  };

  onClick = () => {
    this.myMethod();
    this.active = true;
    console.log(this.observable2);
    // ...
  };

  




  render() {
    return (
      <button onClick={this.onClick} disabled={this.active}>click works only once</button>
    );
  }
}

export default MyComponent;