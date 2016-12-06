/* global window: true */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Paper from 'material-ui/Paper';

import FloorPlan from './FloorPlan';
import { getFloorInfo, setActiveSeat, moveSeat } from '../actions/floorPlanActions';

import './FloorPlanContainer.css';

class FloorPlanContainer extends React.Component {
  componentWillMount() {
    this.props.fetchFloorInfo(this.props.floorId);
  }

  // componentDidMount() {
  //   console.info(window.innerHeight);
  //   console.info(document.querySelector('div.fpwrapper').offsetHeight);
  // }

  render() {
    // <Paper className={this.props.floor.activeSeat ? 'fpi--active' : 'fpi'} zDepth={1}>
    //   <h2 className="floor-plan__title">Info</h2>
    // </Paper>
    return (
      <div className="fpwrapper">
        <FloorPlan {...this.props} />
      </div>
    );
  }
}

FloorPlanContainer.propTypes = {
  floorId: PropTypes.string,
  officeName: PropTypes.string,
  floorName: PropTypes.string,
  plan: PropTypes.string,
  seats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    occupant: PropTypes.string,
  })),
  seatRadius: PropTypes.number,
  activeSeatId: PropTypes.string,
  onSeatSelect: PropTypes.func,
  onSeatMove: PropTypes.func,
};

const mapStateToProps = state => ({
  floorId: state.floorPlan.id,
  officeName: state.floorPlan.office.name,
  floorName: state.floorPlan.name,
  plan: state.floorPlan.plan,
  seats: state.floorPlan.seats,
  seatRadius: state.floorPlan.seatRadius,
  activeSeatId: state.floorPlan.activeSeat ?state.floorPlan.activeSeat.id  : null,
});

const mapDispatchToProps = dispatch => ({
  fetchFloorInfo: floorPlanId => dispatch(getFloorInfo(floorPlanId)),
  onSeatSelect: seatId => dispatch(setActiveSeat(seatId)),
  onSeatMove: (x, y) => dispatch(moveSeat(x, y)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FloorPlanContainer);
