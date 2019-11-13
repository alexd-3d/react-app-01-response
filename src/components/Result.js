import React from 'react';
import ReactDOM from 'react-dom';

export default function Result(props) {
    let {users} = props;

    function showUsers(usersList) {
        return usersList.map(user => <li key={user.id}>Name: {user.name}, E-mail: {user.email}</li>)
    }

    return ReactDOM.createPortal((
        <div className="App-result">
            <ul className="App-result-list">
                {showUsers(users)}
            </ul>
        </div>),
        document.getElementById('results'))
}
