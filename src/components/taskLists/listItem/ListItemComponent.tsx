import React, {useCallback, useState} from 'react';
import {IconButton, ListItem, Radio, TextareaAutosize} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Task } from '../../../type-definitions';
import { updateStatus, updateTabsNumbers, updateTask, removeTask } from '../../../context/app/actions';
import { useAppDispatch } from '../../../customHooks';

import './ListItemComponent.css';

type Props = {
  task: Partial<Task>
}

const ListItemComponent = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(task.completed || false);
  const [input, setInput] = useState(task.task || '');

  const handleUpdateStatus = useCallback(() => {
    if (task.id) {
      setChecked(!checked);
      setTimeout(() => {
        dispatch(updateStatus((task.id as string)));
        dispatch(updateTabsNumbers());
      }, 800);
    }
  }, [task, checked]);

  const handleUpdateTask = useCallback(() => {
    if (task.id && task.task !== input) {
      console.debug(`Updating the task with id:${task.id}, new text: ${input}`);
      dispatch(updateTask(task.id, input));
    }
  }, [task, input]);

  const handleRemoveTask = useCallback(() => {
    if (task.id) {
      setTimeout(() => {
        dispatch(removeTask((task.id as string)));
        dispatch(updateTabsNumbers());
      }, 800);
    }
  }, [task]);

  return (
    <ListItem
      alignItems="flex-start"
      className="ListItem"
      sx={{ padding: '0' }}
    >
      <Radio
        checked={checked}
        onClick={handleUpdateStatus}
        disabled={!task.id}
        sx={{ marginTop: '0.5rem' }}
      />
      <div className="TextAreaContainer">
        <TextareaAutosize
          id="input-without-icon"
          placeholder="New task"
          className="InputField"
          value={input}
          onChange={(element) => setInput(element.target.value)}
          spellCheck={false}
          onBlur={handleUpdateTask}
          style={{ width: '100%' }}
          autoFocus={!task.task}
        />
        <div className="ExtraFuncContainer">
          <IconButton aria-label="delete" size="small" className="IconContainer" onClick={handleRemoveTask}>
            <ClearIcon fontSize="large" className="Icon"/>
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};

export default React.memo(ListItemComponent);
