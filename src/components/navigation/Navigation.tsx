import * as React from 'react';
import {
  TextField,
  InputAdornment,
  Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InboxIcon from '@mui/icons-material/Inbox';
import DoneIcon from '@mui/icons-material/Done';
import { Tabs } from '../app/App';

import './Navigation.css'

type Props = {
  tab: keyof typeof Tabs,
  setTab: (value: keyof typeof Tabs) => void,
}

const Navigation = ({ tab, setTab }: Props) => {
  return (
    <div className="NavigationContainer">
      <div className="SearchInputContainer">
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Search"
          fullWidth
          className="SearchInput"
          size="small"
        />
      </div>

      <nav>
        <ul className="TabsContainer">
          <li className={`TabContainer TodayTab ${tab === 'TODAY' && 'Chosen'}`} onClick={() => setTab('TODAY')}>
            <div className="DetailsContainer">
              <span className="IconContainer">
                <Badge badgeContent={new Date().getDate()} color="info">
                  <CalendarMonthIcon fontSize="inherit"/>
                </Badge>
              </span>

              <span className="TaskCounter">4</span>
            </div>
            <p className="TabName">Today</p>
          </li>

          <li className={`TabContainer AllTab ${tab === 'ALL' && 'Chosen'}`}  onClick={() => setTab('ALL')}>
            <div className="DetailsContainer">
              <span className="IconContainer">
                <InboxIcon fontSize="inherit"/>
              </span>

              <span className="TaskCounter">4</span>
            </div>
            <p className="TabName">All</p>
          </li>

          <li className={`TabContainer Completed ${tab === 'COMPLETED' && 'Chosen'}`} onClick={() => setTab('COMPLETED')}>
            <div className="DetailsContainer">
              <span className="IconContainer">
                <DoneIcon fontSize="inherit"/>
              </span>

              <span className="TaskCounter">4</span>
            </div>
            <p className="TabName">Completed</p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
