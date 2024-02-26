import { useContext, useEffect, useState } from 'react';
import WelcomePage from '../welcomePage/WelcomePage';
import InfoPanel from '../common/infoPanel/InfoPanel';
import LoadingPage from '../loadingPage/LoadingPage';
import { PRE_LOAD_PAGE_TIME } from '../../constants/constants';
import { AppContext } from '../../context/app';

import './App.css';

function App() {
  const [isAnimated, setIsAnimated] = useState(true);
  const messages = useContext(AppContext).state.messages;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, PRE_LOAD_PAGE_TIME);
    return () => clearTimeout(timer);
  }, []);

  if (isAnimated) {
    return <LoadingPage timeForLoadingPage={PRE_LOAD_PAGE_TIME} />;
  }

  return (
    <div className="App Shown">
      <header>
        <span/>
      </header>

      <main>
        <WelcomePage/>
      </main>

      <footer>
        <span/>
      </footer>
      <div className="MessagesContainer">
        {messages.map((message) => {
          return <InfoPanel message={message} />;
        })}
      </div>
    </div>
  );
}

export default App;
