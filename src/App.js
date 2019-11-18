import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

import { requestCancelHandler, requestRetryHandler, fetchUsers, setTheme } from './redux/actions'
import Button from './components/Button';
import Themes from './components/Themes';
import './App.css';

const Result = React.lazy(() => import('./components/Result'));

class App extends React.Component {
  constructor() {
    super();

    this.cancelBtnRef = React.createRef();
  }

  componentDidUpdate() {
    this.props.app.isLoading && this.cancelBtnRef.current.focus();
  }

  render() {
    let {requestCancelHandler, requestRetryHandler, fetchUsers, setTheme, theme} = this.props;
    let {users, isLoading, requestError} = this.props.app;

    return (
      <div className="App" style={theme}>
        <div className="App-themes">
           Current color: {theme.color}
          <Button onClickHandler={() => setTheme(Themes.light)} text='Light' />
          <Button onClickHandler={() => setTheme(Themes.dark)} text='Dark' />
        </div>

        <Button onClickHandler={() => fetchUsers()} text='Send' disabled={requestError || isLoading} />
        <Button onClickHandler={() => requestCancelHandler()} text='Cancel' disabled={requestError || !isLoading} ref={this.cancelBtnRef}/>
        <Button onClickHandler={() => requestRetryHandler()} text='Retry' disabled={!requestError} />
        {isLoading && <div className="App-loading">Loading...</div>}
        {requestError && <div className="App-error">ERROR, please retry...</div>}
        {users && 
          <Suspense fallback={ReactDOM.createPortal((<div className="App-result">Preparing results...</div>), document.getElementById('results'))}>
            <Result users={users}/>
          </Suspense>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ // можно было и просто передать стор - ведь он полностью полагается на все элементы из него
  app: state.app, 
  theme: state.theme
})

const mapDispatchToProps = {
  fetchUsers,
  requestCancelHandler,
  requestRetryHandler,
  setTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
