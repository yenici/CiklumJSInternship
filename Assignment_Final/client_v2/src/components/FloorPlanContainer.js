/* global window: true */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
// import cssModules from 'react-css-modules';

import FloorPlan from './FloorPlan';
import { getFloorInfo, setActiveSeat, moveSeat } from '../actions/floorPlanActions';

import './FloorPlanContainer.css';

class FloorPlanContainer extends React.Component {
  componentWillMount() {
    this.props.fetchFloorInfo(this.props.floor.id);
  }

  render() {
    console.info('render call...');
    // activeSeatId="58204762db89262a380b04fe"
    return (
      <div className="fpwrapper">
        <FloorPlan
          officeName={this.props.floor.office.name}
          floorName={this.props.floor.name}
          plan={this.props.floor.plan}
          seatRadius={this.props.floor.seatRadius}
          seats={this.props.floor.seats}
          activeSeatId={this.props.floor.activeSeat ? this.props.floor.activeSeat.id : null}
          onSeatSelect={this.props.onClickOnSeat}
        />
        <Paper className={this.props.floor.activeSeat ? 'fpi--active' : 'fpi'} zDepth={1}>
          <h2 className="floor-plan__title">Info</h2>
        </Paper>
      </div>
    );
  }
}

FloorPlanContainer.propTypes = {
  floor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
    seatRadius: PropTypes.number.isRequired,
    seats: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.shape({
        y: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
      }),
      occupant: PropTypes.string,
      occupantUrl: PropTypes.string,
    })),
    activeSeat: PropTypes.shape({
      modified: PropTypes.bool,
      id: PropTypes.string,
      name: PropTypes.string,
      occupant: PropTypes.string,
      occupantUrl: PropTypes.string,
      position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    }),
    office: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  fetchFloorInfo: PropTypes.func,
  onClickOnSeat: PropTypes.func,
  moveSeat: PropTypes.func,
};

const mapStateToProps = state => ({
  floor: state.floorPlan,
  small: state.floorPlan.activeSeat,
  // office: state.spacePlanner.office.name,
  // floorPlanId: state.spacePlanner.floor.id,
  // floor: state.spacePlanner.floor.name,
  // plan: state.spacePlanner.floor.plan,
  // seatRadius: state.spacePlanner.seatRadius,
  // seats: state.spacePlanner.seats,
  // activeSeat: state.spacePlanner.activeSeat,
  // token: state.globalState.token,
  // access: state.globalState.adminMode,
  // modalMode: state.globalState.modalMode,
});

const mapDispatchToProps = dispatch => ({
  fetchFloorInfo: floorPlanId => dispatch(getFloorInfo(floorPlanId)),
  // onSeatSelect: seatId => dispatch(setActiveSeat(seatId)),
  onClickOnSeat: seatId => dispatch(setActiveSeat(seatId)),
  onMoveSeat: (x, y) => dispatch(moveSeat(x, y)),
  // addNewSeat: () => dispatch(addNewSeat()),
  // changeSeatName: name => dispatch(changeSeatName(name)),
  // changeSeatOccupant: occupant => dispatch(changeSeatOccupant(occupant)),
  // cancelSeatChange: () => dispatch(cancelSeatChange()),
  // addSeat: (floorPlanId, seat, token) => dispatch(addSeat(floorPlanId, seat, token)),
  // updateSeat: (floorPlanId, seat, token) => dispatch(updateSeat(floorPlanId, seat, token)),
  // deleteSeat: (floorPlanId, seat, token) => dispatch(deleteSeat(floorPlanId, seat, token)),
});

// export default connect(mapStateToProps, mapDispatchToProps)(cssModules(FloorPlanContainer, styles));
export default connect(mapStateToProps, mapDispatchToProps)(FloorPlanContainer);
