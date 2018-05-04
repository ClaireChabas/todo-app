import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
const API_URL = '/api/todos/';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.addTodo = this.addTodo.bind(this);
    }
    
    componentWillMount() {
        this.loadTodos();
    }
    
    /*
        LOADING ALL THE TODOS TO BE DISPLAYED
    */
    loadTodos() {
        fetch(API_URL)
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: 'Server is not responding. Please try again later.'};
                    throw err;
                }
            }
            return resp.json();
        })
        .then(todos => this.setState({todos}));
    }
    
    /*
        SENDING A NEW TODO TO THE DB
    */
    addTodo(val) {
        fetch(API_URL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({name: val})
        })
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: 'Server is not responding. Please try again later.'};
                    throw err;
                }
            }
            return resp.json();
        })
        .then(newTodo => {
            this.setState({todos: [...this.state.todos, newTodo]})
        });
    }
    
    /*
        DELETING A TODO
    */
    deleteTodo(id) {
        const deleteUrl = API_URL+id;
        fetch(deleteUrl, {
            method: 'delete'
        })
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: 'Server is not responding. Please try again later.'};
                    throw err;
                }
            }
        })
        .then(() => {
            const todos = this.state.todos.filter(todo => todo._id !== id)
            this.setState({todos: todos});
        });
    }
    
    toggleTodo(todo) {
        const updateUrl = API_URL+todo._id;
        fetch(updateUrl, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({completed: !todo.completed})
        })
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: 'Server is not responding. Please try again later.'};
                    throw err;
                }
            }
        })
        .then((updatedTodo) => {
            const todos = this.state.todos.map(t => 
                (t._id === updatedTodo._id)
                ? {...t, completed: !t.completed}
                : t
            );
            this.setState({todos: todos});
        });
    }
    
    render() {
        const todos = this.state.todos.map(t => (
            <TodoItem 
                key={t._id}
                {...t}
                onDelete={this.deleteTodo.bind(this, t._id)}
                onToggle={this.toggleTodo.bind(this,t)}
            />    
        ));
        return (
            <div>
                <h1>To-do List</h1>
                <TodoForm addTodo={this.addTodo} />
                <ul>{todos}</ul>
            </div>
        );
    }
}

export default TodoList;