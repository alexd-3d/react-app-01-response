import React from 'react';

const Button = React.forwardRef((props, ref) => {
    let {onClickHandler, text, disabled} = props;
    return (
        <button onClick={onClickHandler} className="App-button" disabled={disabled} ref={ref}>
            {text}
        </button>
    )
});

export default Button;
