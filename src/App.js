import React, {useState, useEffect, Suspense} from 'react';
import axios from 'axios';
import './App.css';

import Button from './components/Button';

const Result = React.lazy(() => import('./components/Result'));

function App() {
  const [users, setUsers] = useState(null);
  const [isLoadings, setIsLoadings] = useState(null);
  const [requestError, setRequestError] = useState(null);

  let CancelToken, source;
  let cancelBtnRef = React.createRef();

  useEffect(() => {
    // не понял к чему мне тут эффект использовать
  });

  function handleSend() {  
    CancelToken = axios.CancelToken;
    source = CancelToken.source();
    console.log('source 1 ',source);
    setIsLoadings(true);
    setRequestError(null);
    //cancelBtnRef.current.focus();
    axios.get(`https://jsonplaceholder.typicode.com/users`, {
        cancelToken: source.token
      })
      .then(res => {
        const users = res.data;
        setUsers(users);
      })
      .catch((error) => axios.isCancel(error) ? setRequestError(null) : handleError(error))
      .finally(() => handleSuccess());
      console.log('source 2 ',source);
  }

  function handleCancel(source) {
    console.log('handleCancel', source);
    source && source.cancel('Operation canceled by the user.');
  }

  function handleRetry() {
    handleSend();
  }

  function handleError(error) {
    setRequestError(error);
  }

  function handleSuccess() {
    console.log('source 3 ',source);
    setIsLoadings(false);
    console.log('source 3.5 ',source);
  }

  return (
    <div className="App">
      <Button onClickHandler={handleSend} text='Send' disabled={requestError || isLoadings} />
      <Button onClickHandler={()=>handleCancel(source)} text='Cancel' disabled={requestError || !isLoadings} ref={cancelBtnRef} />
      <Button onClickHandler={handleRetry} text='Retry' disabled={!requestError}/>
      {isLoadings && <div className="App-loading">Loading...</div>}
      {requestError && <div className="App-error">ERROR, please retry...</div>}
      {users && 
        <Suspense fallback={<div>Preparing results...</div>}>
          <Result users={users}/>
        </Suspense>
      }
    </div>
  );
}

// Вопросы:
// 1. К чему применить в данной реализации эффекты?
// 2. По идее, лейзи лоадиг должен начаться ДО или ВМЕСТЕ с отправкой аякс запроса (щас - наоборот) - как этим управлять?
// 2.1 В случае с порталом - ведь мне надо вывести заглушку в том месте (в том же ДОМ-контейнере), куда я выведу результат, а щас не так
// 3. Куда теряется переменная source в handleCancel?!


export default App;
