import * as React from 'react';
import { List } from '@mui/material';
import ListItemComponent from '../listItem/ListItemComponent';
import { sortTasksByDate, sortTasksByDateAndCompletion } from '../../../helpers/sortTasks';

import { Tabs } from '../../app/App';
import { Task } from '../../../type-definitions';

import './List.css';

type Props = {
  data: Array<Partial<Task>>;
  tab: keyof typeof Tabs;
}

const ListComponent = ({ data, tab }: Props) => {
  let parsedData = data;

  if (tab === 'TODAY') {
    parsedData = data
      .filter((task) => {
        if (task?.createdAt) {
          return !task?.completed && new Date(task?.createdAt).getDate() === new Date().getDate();
        }
        return false;
      })
      .sort(sortTasksByDate);
  }

  if (tab === 'COMPLETED') {
    parsedData = data
      .filter((task) => {
        return task?.completed;
      })
      .sort(sortTasksByDate);
  }

  if (tab === 'UNCOMPLETED') {
    parsedData = data
      .filter((task) => {
        return !task?.completed;
      })
      .sort(sortTasksByDate);
  }

  if (tab === 'ALL') {
    parsedData = data
      .sort(sortTasksByDateAndCompletion);
  }

  return (
    <List className="ListContainer" sx={{ padding: 0 }}>
      {!!parsedData.length && parsedData.map((item) => {
        return (
          <ListItemComponent task={item} key={item.id}/>
        );
      })}
    </List>
  );
}

export default ListComponent;
