import React from 'react';

const Themes = {
    dark: {
        color: '#EEE',
        backgroundColor: '#333'
    },
    light: {
        color: '#333',
        backgroundColor: '#EEE'
    }
};

const ThemesContext = React.createContext(Themes.light);

// Вариант HOC#1 - более короткий через static contextType

const withTheme = (Component) => 
    class ThemeWrapper extends React.Component {
        static contextType = ThemesContext; // magic ;)

        render() {
            return <Component theme={this.context} />
        }
    }

// Вариант HOC#2 - с помощью ThemesContext.Consumer

// const withTheme = (Component) => 
//     class ThemeWrapper extends React.Component {
//         render() {
//             return (
//                 <ThemesContext.Consumer>
//                     { theme => 
//                         <Component theme={theme} />
//                     }
//                 </ThemesContext.Consumer>
//             )
//         }
//     } 

export  {Themes, ThemesContext, withTheme};
