const API_URL = '/api/todos/';

export async function getTodos() {
    return fetch(API_URL)
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
}

export async function createTodo(val) {
    return fetch(API_URL, {
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
}

export async function removeTodo(id) {
    const deleteUrl = API_URL+id;
    return fetch(deleteUrl, {
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
}

export async function updateTodo(todo) {
    const updateUrl = API_URL+todo._id;
    return fetch(updateUrl, {
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
}