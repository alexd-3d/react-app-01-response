import React from 'react';
import ReactDOM from 'react-dom';

import ResultUI from './ResultUI';

export default function Result(props) {
    let {users} = props;

    function showUsers(usersList) {
        return usersList.map(user => <li key={user.id}>Name: {user.name}, E-mail: {user.email}</li>)
    }

    return ReactDOM.createPortal(
        <ResultUI>
            {showUsers(users)}
        </ResultUI>,
        document.getElementById('results'));
}
