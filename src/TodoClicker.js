import { observable } from "mobx";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { useObservable, observer } from "./mobx-react";

/**
 * Simple counter component, with local, observable based state
 */
const Counter = observer(() => {
  const counter = useObservable({
    count: 0
  });

  return (
    <div>
      {counter.count}
      <button onClick={() => counter.count--}>-</button>
      <button onClick={() => counter.count++}>+</button>
      <hr />
    </div>
  );
});

/**
 * Complexer component, with state that lives outside the component
 */
const person = observable({
  name: "WiX",
  age: 10
});

const App = observer(function App({ tick }) {
  function updateName(name) {
    person.name = name;
  }

  function becomeOlder() {
    person.age++;
  }

  return (
    <div className="App">
      <h1>
        Hello {person.name}
        {tick} ({person.age})
      </h1>
      <input
        onChange={e => {
          updateName(e.target.value);
        }}
        value={person.name}
      />
      <br />
      <button onClick={becomeOlder}>Older</button>
      <hr />
    </div>
  );
});

/**
 * Todo list. Inspiring.
 * Check the log statements to verify that the rendering is optimal
 */
const todos = observable([
  { id: 1, title: "Learn hooks", done: false },
  { id: 2, title: "MobX is awesome", done: true }
]);

const Todo = observer(({ todo }) => {
  console.log("render todo " + todo.id);
  return (
    <li>
      <input
        type="checkbox"
        value={todo.done}
        onClick={() => (todo.done = !todo.done)}
      />
      {todo.title}
    </li>
  );
});

const Todos = observer(({ todos }) => (
  <div>
    <ul>{todos.map(todo => <Todo key={todo.id} todo={todo} />)}</ul>
    <button
      onClick={() => {
        todos.push({
          id: Math.random(),
          title: "generated todo",
          done: false
        });
      }}
    >
      Add
    </button>
  </div>
));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <div>
    <Counter />
    <App />
    <Todos todos={todos} />
  </div>,
  rootElement
);




//=====================================

import { observable } from "mobx";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { useObservable, observer } from "./mobx-react";

/**
 * Simple counter component, with local, observable based state
 */
const Counter = observer(() => {
  const counter = useObservable({
    count: 0
  });

  return (
    <div>
      {counter.count}
      <button onClick={() => counter.count--}>-</button>
      <button onClick={() => counter.count++}>+</button>
      <hr />
    </div>
  );
});

/**
 * Complexer component, with state that lives outside the component
 */
const person = observable({
  name: "Michel",
  age: 33
});

function updateName(name) {
  person.name = name;
}

function becomeOlder() {
  person.age++;
}

const App = observer(function App() {
  return (
    <div className="App">
      <h1>
        Hello {person.name} ({person.age})
      </h1>
      <input
        onChange={e => {
          updateName(e.target.value);
        }}
        value={person.name}
      />
      <br />
      <button onClick={becomeOlder}>Older</button>
      <hr />
    </div>
  );
});

/**
 * Todo list. Inspiring.
 * Check the log statements to verify that the rendering is optimal
 */
const todos = observable([
  { id: 1, title: "Learn hooks", done: false },
  { id: 2, title: "MobX is awesome", done: true }
]);

const Todo = observer(({ todo }) => {
  console.log("render todo " + todo.id);
  return (
    <li>
      <input
        type="checkbox"
        value={todo.done}
        onClick={() => (todo.done = !todo.done)}
      />
      {todo.title}
    </li>
  );
});

const Todos = observer(({ todos }) => (
  <div>
    <ul>{todos.map(todo => <Todo key={todo.id} todo={todo} />)}</ul>
    <button
      onClick={() => {
        todos.push({
          id: Math.random(),
          title: "generated todo",
          done: false
        });
      }}
    >
      Add
    </button>
  </div>
));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <div>
    <Counter />
    <App />
    <Todos todos={todos} />
  </div>,
  rootElement
);



//===================================

import React from "react";
import ReactDOM from "react-dom";

import { useImmer } from "use-immer";

import "./styles.css";

function App() {
  const [person, updatePerson] = useImmer({
    name: "Michel",
    age: 33
  });

  function updateName(name) {
    updatePerson(draft => {
      draft.name = name;
    });
  }

  function becomeOlder() {
    updatePerson(draft => {
      draft.age++;
    });
  }

  return (
    <div className="App">
      <h1>
        Hello {person.name} ({person.age})
      </h1>
      <input
        onChange={e => {
          updateName(e.target.value);
        }}
        value={person.name}
      />
      <br />
      <button onClick={becomeOlder}>Older</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
