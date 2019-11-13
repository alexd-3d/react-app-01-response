import React from 'react';
import { ThemesContext } from './Themes';
import HOCTestBlock from './HOCTestBlock';

export default function ResultUI(props) {
    return (
        <>
            <ThemesContext.Consumer>
                { theme => 
                    <div className="App-result" style={theme}>
                        <ul className="App-result-list">
                            {props.children}
                        </ul>
                    </div>
                }
            </ThemesContext.Consumer>

            <HOCTestBlock />
        </>
    );
}
