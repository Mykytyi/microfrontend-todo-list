import { useState, useEffect, useContext } from 'react';
import Alert from '@mui/material/Alert';
import { Message } from '../../../context/app/actions';
import { appActions, AppContext } from '../../../context/app';
import { INFORMATION_TIME } from '../../../constants/constants';

import './InfoPanel.css';

import type { FC } from 'react';

type Props = {
  message: Message,
}

const InfoPanel: FC<Props> = ({ message }) => {
  const { dispatch } = useContext(AppContext);
  const [className, setClassName] = useState('AlertContainer Animated BackInRight')

  useEffect(() => {
    setTimeout(() => {
      setClassName('AlertContainer Animated BackInRightHide');
    }, INFORMATION_TIME);
  }, []);

  return (
    <div className={className}>
      <Alert severity={message.type}>{message.message}</Alert>
    </div>
  );
}

export default InfoPanel;
