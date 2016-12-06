import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';

import './FloorPlan.css';
import FloorPlanSvg from './FloorPlanSvg';

const SVG_WRAPPER_ID_PREFIX = 'cs_f_id';

class FloorPlan extends React.Component {

  svgElementId = `${SVG_WRAPPER_ID_PREFIX}${Math.random().toString().substr(2)}`;

  componentDidMount() {
    this.floorPlanSvg = new FloorPlanSvg(this.svgElementId);
    this.floorPlanSvg.render(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.floorPlanSvg.render(nextProps);
    return nextProps.officeName !== this.props.officeName ||
      nextProps.floorName !== this.props.floorName;
  }

  render() {
    // <ReactResizeDetector handleWidth onResize={() => this.scalePlan()} />
    return (
      <Paper className={this.props.activeSeatId ? 'floor-plan__paper--small' : 'floor-plan__paper'} zDepth={1}>
        <h2 className="floor-plan__title">
          {this.props.officeName && `${this.props.officeName} - ${this.props.floorName}`}
        </h2>
        <div id={this.svgElementId} className="floor-plan__svg-wrapper" />
      </Paper>
    );
  }
}

FloorPlan.propTypes = {
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

export default FloorPlan;
