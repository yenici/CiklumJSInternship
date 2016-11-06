import React, { PropTypes } from 'react';

const FloorPlanTitle = function FloorPlanTitle({
  office, floor, enableAdd, modalMode, onAddNewSeat,
}) {
  const button = modalMode ?
    (
      <button
        className="pure-button pure-button-primary"
        onClick={onAddNewSeat}
        disabled
      >
        Add new seat
      </button>
    ) :
    (
      <button
        className="pure-button pure-button-primary"
        onClick={onAddNewSeat}
      >
        Add new seat
      </button>
    );
  return (
    <div className="floor-plan-title">
      {office}<br /><span>{floor}</span><br />
      {enableAdd ? button : null}
    </div>
  );
};

FloorPlanTitle.propTypes = {
  office: PropTypes.string.isRequired,
  floor: PropTypes.string.isRequired,
  enableAdd: PropTypes.bool,
  modalMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object, // for null
  ]),
  onAddNewSeat: PropTypes.func,
};

export default FloorPlanTitle;
