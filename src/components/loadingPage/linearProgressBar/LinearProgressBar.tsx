import './LinearProgressBar.css';
import React from 'react';
interface LinearProgressBar {
  percent: number;
  fontSize?: number;
  animateTiming?: number;
}
const LinearProgressBar: React.FC<LinearProgressBar> = (props) => {
  return (
    <div className="LinearProgressBar">
      <div className="EmptyProgressBar" style={{ width: "100%" }}>
        <div
          className="FillingProgressBar"
          style={{
            left: props.percent - 100 + "%",
            transition: "1s"
          }}
        />
      </div>
    </div>
  );
};

export default LinearProgressBar;
