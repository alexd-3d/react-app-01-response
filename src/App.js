import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

import Button from './components/Button';

const Result = React.lazy(() => import('./components/Result'));

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      users: null,
      isLoadings: null,
      requestError: null
    };

    this.handleSend = this.handleSend.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleRetry = this.handleRetry.bind(this);
  }

  handleSend() {  
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();

    this.setState({ isLoadings: true, requestError: null });
    axios.get(`https://jsonplaceholder.typicode.com/users`, {
        cancelToken: this.source.token
      })
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
      .catch((error) => axios.isCancel(error) ? this.setState({ requestError: null }) : this.handleError(error))
      .finally(() => this.handleSuccess());
  }

  handleCancel() {
    this.source.cancel('Operation canceled by the user.');
  }

  handleRetry() {
    this.handleSend();
  }

  handleError(error) {
    this.setState({ requestError: error });
  }

  handleSuccess() {
    this.setState({ isLoadings: false });
  }

  render() {
    let {users, isLoadings, requestError} = this.state;
    return (
      <div className="App">
        <Button onClickHandler={this.handleSend} text='Send' disabled={requestError || isLoadings} />
        <Button onClickHandler={this.handleCancel} text='Cancel' disabled={requestError || !isLoadings} />
        <Button onClickHandler={this.handleRetry} text='Retry' disabled={!requestError} />
        {isLoadings && <div className="App-loading">Loading...</div>}
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

export default App;
