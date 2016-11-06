import React from 'react';

const FloorPanel = function FloorPanel(props) {
  return (
    <div className="floor-panel">{props.children}</div>
  );
};

export default FloorPanel;
