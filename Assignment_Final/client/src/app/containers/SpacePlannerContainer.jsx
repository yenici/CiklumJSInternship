import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import FloorPlan from '../components/FloorPlan.jsx';
import FloorPanel from '../components/FloorPanel.jsx';
import FloorPlanTitle from '../components/FloorPlanTitle.jsx';
import SeatInfo from '../components/SeatInfo.jsx';

import {
  getFloorInfo,
  setActiveSeat,
  addNewSeat,
  moveSeat,
  changeSeatName,
  changeSeatOccupant,
  cancelSeatChange,
  addSeat,
  updateSeat,
  deleteSeat,
} from '../actions/spacePlannerActions';

class SpacePlannerContainer extends React.Component {
  componentWillMount() {
    /*
       +-----------------------------------------------+
       |   TODO: The hardcoded ID for the Floor Plan   |
       +-----------------------------------------------+
     */
    this.props.fetchFloorInfo('581f563cbc1c9f0f1c2faee5');
  }
  render() {
    return (
      <div className="space-planner-container">
        <FloorPlan
          plan={this.props.plan}
          seatRadius={this.props.seatRadius}
          seats={this.props.seats}
          activeSeat={this.props.activeSeat}
          enableDnD={this.props.access}
          modalMode={this.props.modalMode}
          onSeatSelect={this.props.setActiveSeat}
          onSeatMove={this.props.moveSeat}
        />
        <FloorPanel>
          <FloorPlanTitle
            office={this.props.office}
            floor={this.props.floor}
            enableAdd={this.props.access}
            modalMode={this.props.modalMode}
            onAddNewSeat={this.props.addNewSeat}
          />
          {
            this.props.activeSeat ?
              <SeatInfo
                floorPlanId={this.props.floorPlanId}
                seat={this.props.activeSeat}
                token={this.props.token}
                fullAccess={this.props.access}
                modalMode={this.props.modalMode}
                onChangeSeatName={this.props.changeSeatName}
                onChangeSeatOccupant={this.props.changeSeatOccupant}
                onCancelSeatChange={this.props.cancelSeatChange}
                onAddSeat={this.props.addSeat}
                onUpdateSeat={this.props.updateSeat}
                onDeleteSeat={this.props.deleteSeat}
              /> :
              null
          }
        </FloorPanel>
      </div>
    );
  }
}

SpacePlannerContainer.propTypes = {
  office: PropTypes.string,
  floorPlanId: PropTypes.string,
  floor: PropTypes.string,
  plan: PropTypes.string,
  seatRadius: PropTypes.number,
  seats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.shape({
        y: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
      }),
      occupant: PropTypes.string,
      occupantUrl: PropTypes.string,
    })
  ).isRequired,
  activeSeat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.shape({
      y: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
    }),
    occupant: PropTypes.string,
    occupantUrl: PropTypes.string,
  }),
  token: PropTypes.bool,
  access: PropTypes.bool,
  modalMode: PropTypes.string,
  fetchFloorInfo: PropTypes.func,
  setActiveSeat: PropTypes.func,
  addNewSeat: PropTypes.func,
  moveSeat: PropTypes.func,
  changeSeatName: PropTypes.func,
  changeSeatOccupant: PropTypes.func,
  cancelSeatChange: PropTypes.func,
  addSeat: PropTypes.func,
  updateSeat: PropTypes.func,
  deleteSeat: PropTypes.func,
};

const mapStateToProps = state => ({
  office: state.spacePlanner.office.name,
  floorPlanId: state.spacePlanner.floor.id,
  floor: state.spacePlanner.floor.name,
  plan: state.spacePlanner.floor.plan,
  seatRadius: state.spacePlanner.seatRadius,
  seats: state.spacePlanner.seats,
  activeSeat: state.spacePlanner.activeSeat,
  token: state.globalState.token,
  access: state.globalState.adminMode,
  modalMode: state.globalState.modalMode,
});

const mapDispatchToProps = dispatch => ({
  fetchFloorInfo: floorPlanId => dispatch(getFloorInfo(floorPlanId)),
  setActiveSeat: seatId => dispatch(setActiveSeat(seatId)),
  addNewSeat: () => dispatch(addNewSeat()),
  moveSeat: (x, y) => dispatch(moveSeat(x, y)),
  changeSeatName: name => dispatch(changeSeatName(name)),
  changeSeatOccupant: occupant => dispatch(changeSeatOccupant(occupant)),
  cancelSeatChange: () => dispatch(cancelSeatChange()),
  addSeat: (floorPlanId, seat, token) => dispatch(addSeat(floorPlanId, seat, token)),
  updateSeat: (floorPlanId, seat, token) => dispatch(updateSeat(floorPlanId, seat, token)),
  deleteSeat: (floorPlanId, seat, token) => dispatch(deleteSeat(floorPlanId, seat, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpacePlannerContainer);
