import React, {useState, useEffect, Suspense} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

import Button from './components/Button';
import {Themes, ThemesContext} from './components/Themes';

const Result = React.lazy(() => import('./components/Result'));

let source; // пришлось вынести сюда, так как (неожиданно) в handleCancel  source всегда undefined... Я надеялся скоуп и замыкание будет работать

function App() {
  const [users, setUsers] = useState(null);
  const [isLoadings, setIsLoadings] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [theme, setTheme] = useState(Themes.light);

  let CancelToken;
  let cancelBtnRef = React.createRef();

  useEffect(() => {
    // не понял к чему мне тут эффект использовать - если сюда вставить вызов handleSend то у меня зайдет в цикл обновление (didMount + didUpdate).
    // кроме того - добавление сюда handleSend будет делать запрос сразу после монтирования компоненты

    // единственное что можно (я так понял и нужно) вставить - это апдейт фокуса потому что в handleSend он похоже сбрасывается сразу так как идет апдейт
    isLoadings && cancelBtnRef.current.focus();
  });

  function handleSend() {  
    CancelToken = axios.CancelToken;
    source = CancelToken.source();
    setIsLoadings(true);
    setRequestError(null);
    axios.get(`https://jsonplaceholder.typicode.com/users`, {
        cancelToken: source.token
      })
      .then(res => {
        const users = res.data;
        setUsers(users);
      })
      .catch((error) => axios.isCancel(error) ? setRequestError(null) : handleError(error))
      .finally(() => handleSuccess());
  }

  function handleCancel() {
    source && source.cancel('Operation canceled by the user.');
  }

  function handleRetry() {
    handleSend();
  }

  function handleError(error) {
    setRequestError(error);
  }

  function handleSuccess() {
    setIsLoadings(false);
  }

  function handleThemeChange(theme) {
    setTheme(theme);
  }

  return (
    <ThemesContext.Provider value={theme}>
      <div className="App" style={theme}>
        <div className="App-themes">
           Current color: {theme.color}
          <Button onClickHandler={()=>handleThemeChange(Themes.light)} text='Light' />
          <Button onClickHandler={()=>handleThemeChange(Themes.dark)} text='Dark' />
        </div>
        <Button onClickHandler={handleSend} text='Send' disabled={requestError || isLoadings} />
        <Button onClickHandler={handleCancel} text='Cancel' disabled={requestError || !isLoadings} ref={cancelBtnRef} />
        <Button onClickHandler={handleRetry} text='Retry' disabled={!requestError}/>
        {isLoadings && <div className="App-loading">Loading...</div>}
        {requestError && <div className="App-error">ERROR, please retry...</div>}
        {users && 
          <Suspense fallback={ReactDOM.createPortal((<div className="App-result">Preparing results...</div>), document.getElementById('results'))}>
            <Result users={users}/>
          </Suspense>
        }
      </div>
    </ThemesContext.Provider>
  );
}

// Вопросы:
// 1. По идее, лейзи лоадиг должен начаться ДО или ВМЕСТЕ с отправкой аякс запроса (щас - наоборот) - как этим управлять?
// 2. Куда теряется переменная source в handleCancel если ее не обьявить возле импорта?!

export default App;
