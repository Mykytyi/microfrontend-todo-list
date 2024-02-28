import * as React from 'react';
import { ListItem, Radio, TextareaAutosize } from '@mui/material';
import { Task } from '../../../type-definitions';
import { useState } from 'react';

type Props = {
  task: Partial<Task>
}

const ListItemComponent = ({ task }: Props) => {
  const [checked, setChecked] = useState(task.completed || false);

  return (
    <ListItem alignItems="flex-start" className="ListItem" sx={{ padding: '0.5rem 0' }}>
      <Radio
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
      <div className="TextAreaContainer">
        <TextareaAutosize
          id="input-without-icon"
          placeholder="New task"
          className="InputField"
          value={task.task}
          //onChange={(value) => console.log(JSON.stringify(value.target.value))}
          style={{ width: '100%' }}
          spellCheck={false}
        />
      </div>
    </ListItem>
  );
};

export default React.memo(ListItemComponent);
