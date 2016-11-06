import React, { PropTypes } from 'react';
import Select from 'react-select';

import EmployeeInfoContainer from '../containers/EmployeeInfoContainer.jsx';
import CiklumSpaceService from '../services/CiklumSpaceService';

const SeatInfo = ({
  floorPlanId, seat, fullAccess, modalMode,
  onChangeSeatName,
  onChangeSeatOccupant,
  onCancelSeatChange,
  onAddSeat,
  onUpdateSeat,
  onDeleteSeat,
}) => {
  if (fullAccess) {
    let saveBtn;
    if (modalMode) {
      saveBtn = modalMode === 'SEAT_ADD'
        ? (
          <button
            className="pure-button pure-button-primary"
            onClick={() => onAddSeat(floorPlanId, seat)}
          >
            Save
          </button>)
        : (
          <button
            className="pure-button pure-button-primary"
            onClick={() => onUpdateSeat(floorPlanId, seat)}
          >
            Save
          </button>);
    } else {
      saveBtn = <button className="pure-button pure-button-disabled" disabled>Save</button>;
    }
    return (
      <div className="seat-info">
        <div className="seat-info__title-input pure-form pure-form-aligned pure-control-group">
          <input
            value={seat.name}
            type="text"
            size="20"
            minLength="3"
            maxLength="20"
            placeholder="Enter title (up to 20 chars)"
            onChange={event => onChangeSeatName(event.target.value)}
          />
        </div>
        <Select.Async
          name="form-field-name"
          loadOptions={CiklumSpaceService.findEmployee}
          valueKey="id"
          labelKey="name"
          value={seat.occupant ? seat.occupant : ''}
          isLoading
          placeholder="Select an occupant..."
          autoload
          autosize={false}
          clearable
          clearValueText="Remove occupant from the seat"
          ignoreCase
          onChange={newValue => onChangeSeatOccupant(newValue ? newValue.id : null)}
        />
        <div className="seat-info__buttons-block">
          {saveBtn}
          {
            modalMode
              ? <button className="pure-button" onClick={() => onCancelSeatChange()}>Cancel</button>
              : <button className="pure-button pure-button-disabled" disabled>Cancel</button>
          }
          {
            modalMode !== 'SEAT_ADD'
              ? (
                <button
                  className="pure-button"
                  onClick={() => onDeleteSeat(floorPlanId, seat)}
                >
                  Delete
                </button>)
              : null
          }
        </div>
      </div>
    );
  }
  return (
    <div className="seat-info">
      <div className="seat-info__title">
        <span
          className={`seat-info__name${seat.occupant ? '' : ' seat-info__name--free'}`}
        >
          {seat.name}
        </span>
      </div>
      {
        seat.occupant
          ? <EmployeeInfoContainer />
          : <div className="seat-info__free-message">The seat is free.</div>
      }
    </div>
  );
};

SeatInfo.propTypes = {
  floorPlanId: PropTypes.string.isRequired,
  seat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.shape({
      y: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
    }),
    occupant: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object, // for null
    ]),
    occupantUrl: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object, // for null
    ]),
  }),
  fullAccess: PropTypes.bool,
  modalMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object, // for null
  ]),
  onChangeSeatName: PropTypes.func,
  onChangeSeatOccupant: PropTypes.func,
  onCancelSeatChange: PropTypes.func,
  onAddSeat: PropTypes.func,
  onUpdateSeat: PropTypes.func,
  onDeleteSeat: PropTypes.func,
};

export default SeatInfo;
