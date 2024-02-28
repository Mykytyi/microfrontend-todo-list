import React, {useContext, useEffect, useState} from 'react';
import {
  Badge,
  Button,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InboxIcon from '@mui/icons-material/Inbox';
import DoneIcon from '@mui/icons-material/Done';
import mockData from '../../mockData/mockData.json';
import { Tabs } from '../app/App';
import { LOCAL_STORAGE_ID } from '../../constants/constants';
import { AppContext } from '../../context/app';
import { loadTasks, updateTabsNumbers } from '../../context/app/actions';

import './Navigation.css'

type Props = {
  tab: keyof typeof Tabs,
  setTab: (value: keyof typeof Tabs) => void,
}

const Navigation = ({ tab, setTab }: Props) => {
  const { dispatch } = useContext(AppContext);
  const { todayTasks, completedTasks, allTasks, uncompletedTasks } = useContext(AppContext).state;
  const [isAddMockDataBlocked, setIsAddMockDataBlocked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_ID)) {
      setIsAddMockDataBlocked(true);
    }
  }, []);

  const addMockDataHandler = () => {
    localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(mockData));
    dispatch(loadTasks());
    dispatch(updateTabsNumbers());
    setIsAddMockDataBlocked(true);
  }

  return (
    <div className="NavigationContainer">
      <div className="Wrapper">
        <nav>
          <ul className="TabsContainer">
            <li className={`TabContainer TodayTab ${tab === 'TODAY' && 'Chosen'}`} onClick={() => setTab('TODAY')}>
              <div className="DetailsContainer">
              <span className="IconContainer">
                <Badge badgeContent={new Date().getDate()} color="info">
                  <CalendarMonthIcon fontSize="inherit"/>
                </Badge>
              </span>

                <span className="TaskCounter">{todayTasks}</span>
              </div>
              <p className="TabName">Today</p>
            </li>

            <li className={`TabContainer AllTab ${tab === 'ALL' && 'Chosen'}`}  onClick={() => setTab('ALL')}>
              <div className="DetailsContainer">
              <span className="IconContainer">
                <InboxIcon fontSize="inherit"/>
              </span>

                <span className="TaskCounter">{allTasks}</span>
              </div>
              <p className="TabName">All</p>
            </li>

            <li className={`TabContainer Completed ${tab === 'COMPLETED' && 'Chosen'}`} onClick={() => setTab('COMPLETED')}>
              <div className="DetailsContainer">
              <span className="IconContainer">
                <DoneIcon fontSize="inherit"/>
              </span>

                <span className="TaskCounter">{completedTasks}</span>
              </div>
              <p className="TabName">Completed</p>
            </li>

            <li className={`TabContainer Uncompleted ${tab === 'UNCOMPLETED' && 'Chosen'}`} onClick={() => setTab('UNCOMPLETED')}>
              <div className="DetailsContainer">
              <span className="IconContainer">
                <DoneIcon fontSize="inherit"/>
              </span>

                <span className="TaskCounter">{uncompletedTasks}</span>
              </div>
              <p className="TabName">Uncompleted</p>
            </li>
          </ul>
        </nav>
      </div>
      <Button
        size="large"
        className="AddMockDataButton"
        disabled={isAddMockDataBlocked}
        onClick={addMockDataHandler}
      >
        Add mock data
      </Button>
    </div>
  );
}

export default Navigation;
