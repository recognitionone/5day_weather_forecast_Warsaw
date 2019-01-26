import * as React from 'react';
import { observer } from 'mobx-react';

import { Header } from './Header';

@observer
export class TodoListView extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <div>
                <Header store={store} />
                <ul>{store.todos.map(todo => <Todo key={todo.id} todo={todo} />)}</ul>
            </div>
        );
    }
}

@observer
class Todo extends React.Component {
    render() {
        const { todo } = this.props;
        return (
            <li key={todo.id}>
                <input id={`input-${todo.id}`} type="checkbox" checked={todo.done} onClick={todo.toggle} />
                <label htmlFor={`input-${todo.id}`}>{todo.title}</label>
            </li>
        );
    }
}


//===================================

import { types, getParent, destroy } from 'mobx-state-tree';

export const Todo = types
    .model('Todo', {
        id: types.optional(types.number, () => Math.random()), // pseudo key
        title: '',
        done: false
    })
    .actions(self => ({
        toggle() {
            self.done = !self.done;
        },
        changeTitle(title) {
            self.title = title;
        },
        remove() {
            // actions on a child are not allowed by default to
            // modify anything in a parent,
            // so we delegate this removal up
            getParent(self, 2).removeTodo(self);
        }
    }));

export const TodoStore = types
    .model('TodoStore', {
        todos: types.optional(types.array(Todo), [])
    })
    .views(self => ({
        get unfinishedTodoCount() {
            return self.todos.filter(todo => !todo.done).length;
        }
    }))
    .actions(self => ({
        addTodo(todo) {
            self.todos.push(todo);
        },
        removeTodo(todo) {
            destroy(todo);
        },
        markAllCompleted() {
            self.todos.forEach(todo => {
                todo.done = true;
            });
        }
    }));





//==========================


import * as React from 'react';
import DevTools from 'mobx-react-devtools';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export class Header extends React.Component {
    @observable inputText = '';

    render() {
        const { store } = this.props;
        return (
            <div>
                <DevTools />
                Tasks left: {store.unfinishedTodoCount}
                <br />
                <button onClick={store.markAllCompleted}>Complete all</button>
                <br />
                New item: <input value={this.inputText} onChange={this.handleInputChange} />
                <button onClick={this.handleCreateTodo}>Add</button>
                <br />
                <hr />
            </div>
        );
    }

    handleInputChange = e => {
        this.inputText = e.target.value;
    };

    handleCreateTodo = () => {
        this.props.store.addTodo({ title: this.inputText });
        this.inputText = '';
    };
}


