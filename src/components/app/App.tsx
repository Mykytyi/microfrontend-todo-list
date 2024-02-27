import { useContext, useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import TaskList from '../taskLists/TaskList';
import InfoPanel from '../common/infoPanel/InfoPanel';
import { PRE_LOAD_PAGE_TIME } from '../../constants/constants';
import { loadTasks } from '../../context/app/actions';
import { AppContext } from '../../context/app';

import './App.css';

export enum Tabs {
  TODAY = 'TODAY',
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  UNCOMPLETED = 'UNCOMPLETED'
}

function App() {
  const { dispatch } = useContext(AppContext);
  const [isAnimated, setIsAnimated] = useState(true);
  const [tab, setTab] = useState<keyof typeof Tabs>(Tabs.TODAY);
  const messages = useContext(AppContext).state.messages;

  useEffect(() => {
    dispatch(loadTasks());
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, PRE_LOAD_PAGE_TIME);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <header>
        <Navigation tab={tab} setTab={setTab} />
      </header>

      <main>
        <TaskList tab={tab}/>
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
