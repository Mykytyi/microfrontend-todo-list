import * as React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Radio,
  InputAdornment,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import { v4 } from 'uuid';

import { Task } from '../../../type-definitions';

import './List.css';

type Props = {
  data: Array<Partial<Task>>;
}
console.log('ID: ', v4());

const ListComponent = ({ data }: Props) => {
  return (
    <List className="ListContainer" sx={{ padding: 0 }}>
      <ListItem alignItems="flex-start" className="ListItem" sx={{ padding: '0.5rem 0' }}>
        <Radio
          checked={true}
          onChange={() => null}
        />
        <div className="TextAreaContainer">
          <TextareaAutosize
            id="input-without-icon"
            placeholder="New task"
            className="InputField"
            //onChange={(value) => console.log(JSON.stringify(value.target.value))}
            style={{ width: '100%' }}
            spellCheck={false}
          />
        </div>
      </ListItem>
    </List>
  );
}

export default ListComponent;
