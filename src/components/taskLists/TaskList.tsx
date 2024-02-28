import React, { useContext, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForward from '@mui/icons-material/ArrowForward';
import List from './list/List';
import { addTask, updateTabsNumbers } from '../../context/app/actions';
import { AppContext } from '../../context/app';

import './TaskList.css';

import { Tabs } from '../app/App';

type Props = {
  tab: keyof typeof Tabs;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
  showHeader: boolean;
}

const TaskList = ({ tab, setShowHeader, showHeader }: Props) => {
  const { dispatch } = useContext(AppContext);
  const data = useContext(AppContext).state.tasks;
  const completedTasks = useContext(AppContext).state.completedTasks;
  const [isHeaderShown, setIsHeaderShown] = useState(false);

  useEffect(() => {
    if (tab === 'ALL' || tab === 'UNCOMPLETED' || tab === 'COMPLETED') {
      setIsHeaderShown(true);
    } else {
      setIsHeaderShown(false);
    }
  }, [tab]);

  let containerClass = ['TaskListContainer'];
  let title = '';

  switch (tab) {
    case 'ALL':
      title = 'All';
      containerClass.push('AllTab');
      break;
    case 'COMPLETED':
      title = 'Completed';
      containerClass.push('Completed');
      break;
    case 'TODAY':
      title = 'Today';
      containerClass.push('TodayTab');
      break;
    case 'UNCOMPLETED':
      title = 'Uncompleted';
      containerClass.push('Uncompleted');
      break;
    default:
      break;
  }

  const handleAddTask = () => {
    dispatch(addTask());
    dispatch(updateTabsNumbers());
  }

  return (
    <div className={containerClass.join(' ')}>
      <div className="TitleContainer">
        <div className="Wrapper">
          <IconButton aria-label="delete" size="medium" className={`${showHeader && "Rotated"}`} onClick={() => setShowHeader(!showHeader)}>
            <ArrowForward fontSize="large"/>
          </IconButton>

          <h2 className="Title">{title}</h2>
        </div>

        <div className="AddTaskButtonContainer">
          <IconButton aria-label="delete" size="medium" onClick={handleAddTask}>
            <AddIcon fontSize="large" />
          </IconButton>
        </div>
      </div>

      <div className="TaskList">
        {isHeaderShown && (
          <div className="Header">
            <p>{completedTasks} Completed</p>
          </div>
        )}

        <List data={data} tab={tab}/>
      </div>
    </div>
  );
};

export default React.memo(TaskList);
