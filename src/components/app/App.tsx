import { useContext, useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import TaskList from '../taskLists/TaskList';
import LoadingPage from '../loadingPage/LoadingPage';
import { PRE_LOAD_PAGE_TIME } from '../../constants/constants';
import { loadTasks, updateTabsNumbers } from '../../context/app/actions';
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
  const [showHeader, setShowHeader] = useState(true);
  const [tab, setTab] = useState<keyof typeof Tabs>(Tabs.TODAY);

  useEffect(() => {
    dispatch(loadTasks());
    dispatch(updateTabsNumbers());
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, PRE_LOAD_PAGE_TIME);
    return () => clearTimeout(timer);
  }, []);

  if (isAnimated) {
    return <LoadingPage timeForLoadingPage={PRE_LOAD_PAGE_TIME} />;
  }

  return (
    <div className="App">
      <header className={`${showHeader && 'Shown'}`}>
        <Navigation tab={tab} setTab={setTab} setShowHeader={setShowHeader}/>
      </header>

      <main>
        <TaskList tab={tab} showHeader={showHeader} setShowHeader={setShowHeader} />
      </main>

      <footer>
        <span/>
      </footer>
    </div>
  );
}

export default App;
