import React from 'react';

export default function Button(props) {
    let {onClickHandler, text, disabled} = props;
    return (
        <button onClick={onClickHandler} className="App-button" disabled={disabled}>
            {text}
        </button>
    )
}
