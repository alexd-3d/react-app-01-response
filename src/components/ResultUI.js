import React from 'react';
import { useSelector } from 'react-redux'

export default function ResultUI(props) {
    const theme = useSelector(state => state.theme);  // пример хука на получение даных из стора для функционального компонента

    return (
        <div className="App-result" style={theme}>
            <ul className="App-result-list">
                {props.children}
            </ul>
        </div>
    );
}
