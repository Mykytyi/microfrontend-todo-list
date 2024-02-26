import React from 'react';

import './Button.css';

interface Props {
  text: string,
  disabled?: boolean,
  additionalClassName?: string,
  onClick?: (props: any) => any,
  type?: "button" | "submit" | "reset" | undefined,
}

const Button: React.FC<Props> = ({
  text,
  additionalClassName,
  onClick,
  type,
  disabled
}) => {
  return (
    <button
      type={type ? type : undefined}
      className={`CommonButton ${additionalClassName} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >{text}</button>
  );
};

export default Button;
