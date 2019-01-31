import React, { Component } from 'react';
// import { observer } from 'mobx-react';



// function tick() {
//   // var start = Date.now();
//   var today = new Date().getDay();
//   var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   var oldWeek = ["Sunnandæg",   "Mōnandæg",   "Tīwesdæg",   "Wōdnesdæg",  "Þunresdæg",  "Frīgedæg",   "Sæternesdæg" ]
  
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//       <h2>It might be {Date.now()}.</h2>
//       <h2>It might be {oldWeek[today]} or {week[today]}</h2> 
//     </div>
//   );
//   // highlight-next-line
//   ReactDOM.render(element, document.getElementById('root'));
// }

// setInterval(tick, 1000);



class Today extends Component {
  render() {
  var today = new Date().getDay();
  var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var oldWeek = ["Sunnandæg",   "Mōnandæg",   "Tīwesdæg",   "Wōdnesdæg",  "Þunresdæg",  "Frīgedæg",   "Sæternesdæg" ];
  
    return (
      <div>
      <h2>It might be {Date.now()}.</h2>
      <h2>It might be {oldWeek[today]} or {week[today]}</h2> 
      </div>
      )
  }
}

export default Today;

