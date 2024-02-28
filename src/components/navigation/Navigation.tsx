import React, { useEffect, useState } from 'react';
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
import { loadTasks, updateTabsNumbers } from '../../context/app/actions';
import { useAppDispatch, useCustomState } from '../../customHooks';

import './Navigation.css'

type Props = {
  tab: keyof typeof Tabs,
  setTab: (value: keyof typeof Tabs) => void,
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation = ({ tab, setTab, setShowHeader }: Props) => {
  const dispatch = useAppDispatch();
  const { todayTasks, completedTasks, allTasks, uncompletedTasks } = useCustomState();
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

  const handleTabClick = (tab: keyof typeof Tabs) => {
    setTab(tab);
    if (window.innerWidth <= 600) {
      setShowHeader(false);
    }
  }

  return (
    <div className="NavigationContainer">
      <div className="Wrapper">
        <nav>
          <ul className="TabsContainer">
            <li className={`TabContainer TodayTab ${tab === 'TODAY' && 'Chosen'}`} onClick={() => handleTabClick('TODAY')}>
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

            <li className={`TabContainer AllTab ${tab === 'ALL' && 'Chosen'}`}  onClick={() => handleTabClick('ALL')}>
              <div className="DetailsContainer">
              <span className="IconContainer">
                <InboxIcon fontSize="inherit"/>
              </span>

                <span className="TaskCounter">{allTasks}</span>
              </div>
              <p className="TabName">All</p>
            </li>

            <li className={`TabContainer Completed ${tab === 'COMPLETED' && 'Chosen'}`} onClick={() => handleTabClick('COMPLETED')}>
              <div className="DetailsContainer">
              <span className="IconContainer">
                <DoneIcon fontSize="inherit"/>
              </span>

                <span className="TaskCounter">{completedTasks}</span>
              </div>
              <p className="TabName">Completed</p>
            </li>

            <li className={`TabContainer Uncompleted ${tab === 'UNCOMPLETED' && 'Chosen'}`} onClick={() => handleTabClick('UNCOMPLETED')}>
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
