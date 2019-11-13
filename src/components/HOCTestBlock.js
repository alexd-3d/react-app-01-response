import React from 'react';
import { withTheme } from './Themes';

function HOCTestBlock(props) {
    return (
        <div style={props.theme}>HOC Test Block</div>
    );
}

export default withTheme(HOCTestBlock);
