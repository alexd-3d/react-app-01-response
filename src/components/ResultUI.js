import React from 'react';

export default function ResultUI(props) {
    return (
        <div className="App-result">
            <ul className="App-result-list">
                {props.children}
            </ul>
        </div>
    );
}
