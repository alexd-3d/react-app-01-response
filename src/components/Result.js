import React from 'react';

export default function Result(props) {
    let {users} = props;

    function showUsers(usersList) {
        return usersList.map(user => <li key={user.id}>Name: {user.name}, E-mail: {user.email}</li>)
    }

    return (
        <div className="App-result">
            <ul className="App-result-list">
                {showUsers(users)}
            </ul>
        </div>
    )
}
