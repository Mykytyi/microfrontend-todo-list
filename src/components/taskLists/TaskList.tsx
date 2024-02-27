import React, { useContext } from 'react';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import List from './list/List';

import './TaskList.css';

import { Tabs } from '../app/App';
import { AppContext } from '../../context/app';

type Props = {
  tab: keyof typeof Tabs;
}

const TaskList = ({ tab }: Props) => {
  const data = useContext(AppContext).state.tasks;

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

  return (
    <div className={containerClass.join(' ')}>
      <div className="TitleContainer">
        <h2 className="Title">{title}</h2>

        <div className="AddTaskButtonContainer">
          <IconButton aria-label="delete" size="medium">
            <AddIcon fontSize="large" />
          </IconButton>
        </div>
      </div>

      <div className="TaskList">
        <div className="Header">
          <p>32 Completed</p>

          <div className="ButtonsContainer">
            <Button variant="text" size="large" color="inherit">Show</Button>
          </div>
        </div>

        <List data={data}/>
      </div>
    </div>
  );
};

export default React.memo(TaskList);
