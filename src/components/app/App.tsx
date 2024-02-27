import { useContext, useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import TaskList from '../taskLists/TaskList';
import InfoPanel from '../common/infoPanel/InfoPanel';
import LoadingPage from '../loadingPage/LoadingPage';
import { PRE_LOAD_PAGE_TIME } from '../../constants/constants';
import { AppContext } from '../../context/app';

import './App.css';

export enum Tabs {
  TODAY = 'TODAY',
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  UNCOMPLETED = 'UNCOMPLETED'
}

function App() {
  const [isAnimated, setIsAnimated] = useState(true);
  const [tab, setTab] = useState<keyof typeof Tabs>(Tabs.TODAY);
  const messages = useContext(AppContext).state.messages;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, PRE_LOAD_PAGE_TIME);
    return () => clearTimeout(timer);
  }, []);

  // if (isAnimated) {
  //   return <LoadingPage timeForLoadingPage={PRE_LOAD_PAGE_TIME} />;
  // }

  return (
    <div className="App">
      <header>
        <Navigation tab={tab} setTab={setTab} />
      </header>

      <main>
        <TaskList />
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
