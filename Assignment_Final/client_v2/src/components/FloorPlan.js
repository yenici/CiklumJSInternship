import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import svgjs from 'svg.js';
import 'svg.draggable.js';

import './FloorPlan.css';

const SVG_WRAPPER_ID_PREFIX = 'cs_f_id';
const SVG_SEAT_ID_PREFIX = 'cs_s_id';
const PLAN_MAX_ZOOM_SCALE = 0.95;

class FloorPlan extends React.Component {

  constructor(props) {
    super(props);
    // this.svgElementId = `${SVG_WRAPPER_ID_PREFIX}${Math.random().toString().substr(2)}`;
    // this.svgElement = null;
    // this.svgGroup = null;
    // this.planElement = null;
    // this.seatsGroup = null;
    // this.activeSeat = null;
  }

  svgElementId = `${SVG_WRAPPER_ID_PREFIX}${Math.random().toString().substr(2)}`;
  svgElement = null;
  svgGroup = null;
  planElement = null;
  seatsGroup = null;
  activeSeat = null;

  componentDidMount() {
    this.svgElement = svgjs(this.svgElementId).size('100%', '100%').spof();
    this.renderSvg(this.props);
    // svgjs.on(window, 'resize', () => {
    //   this.svgWrapper.element.spof();
    // });
    // this.svgElement.on('click', e => this.props.onSeatSelect(e.target));
    this.svgElement.on('click', e => {
      let selectedSeatId = null;
      if (e.target.parentNode.id.substr(0, SVG_SEAT_ID_PREFIX.length) === SVG_SEAT_ID_PREFIX) {
        selectedSeatId = e.target.parentNode.id.substr(SVG_SEAT_ID_PREFIX.length);
      }
      // console.info(this.props.onSeatSelect);
      this.props.onSeatSelect(selectedSeatId);
    });
    // this.svgElement.on('click', e => {
    //   this.seatsGroup.clear();
    // });
    // if (this.props.plan) update svg;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.info(`Active seat: ${nextProps.activeSeatId}`);
    this.renderSvg(nextProps);
    return nextProps.officeName !== this.props.officeName ||
      nextProps.floorName !== this.props.floorName;
  }

  renderSvg(nextProps) {
    if (nextProps) {
      if (this.props.plan !== nextProps.plan) {
        this.renderPlan(nextProps);
        this.renderSeats(nextProps);
      } else {
        if (this.props.seatRadius !== nextProps.seatRadius) {
          this.renderSeats(nextProps);
        }
        if (this.props.seats !== nextProps.seats || this.props.activeSeatId !== nextProps.activeSeatId) {
          // The second condition is used to ensure that the active seat is the last
          // rendered set (overflow other seats)
          this.renderSeats(nextProps);
        }
      }
    }
  }

  scalePlan() {
    // Restore the scale
    this.svgElement.scale(1, 1);
    // Align the floor plan in the center of a DIV
    this.svgGroup
      .x((this.svgElement.viewbox().width - this.planElement.width()) / 2);
    this.svgGroup
      .y((this.svgElement.viewbox().height - this.planElement.height()) / 2);
    // Zoom the floor plan according to the DIV's size
    const zoom = PLAN_MAX_ZOOM_SCALE * Math.min(
        this.svgElement.viewbox().width / this.planElement.width(),
        this.svgElement.viewbox().height / this.planElement.height());
    this.svgGroup.scale(zoom, zoom);
  }

  renderPlan({ plan }) {
    if (this.svgElement && plan) {
      this.svgElement.clear();
      // Show the floor plan
      this.svgElement.svg(plan);
      // A group for dragging and zooming
      this.svgGroup = this.svgElement.group();
      // 'floorplan' is an ID inside svg for floor plan
      this.planElement = svgjs.get('floorplan');
      this.planElement.addTo(this.svgGroup);
      // A group for seats
      this.seatsGroup = this.planElement.group();
      this.seatsGroup.addTo(this.svgGroup);
      this.scalePlan();
    }
  }

  renderSeats({ seats, seatRadius, activeSeatId }) {
    if (seats) {
      this.seatsGroup.clear();
      this.activeSeat = null;
      seats.forEach((seat) => {
        if (seat.id !== activeSeatId) {
          this.drawSeat(seat, seatRadius);
        } else {
          this.activeSeat = seat;
        }
      });
      if (this.activeSeat) {
        this.drawSeat(this.activeSeat, seatRadius, true);
      }
    }
  }

  drawSeat(seat, seatRadius, isActive) {
    // Original size of the person icon is 16px x 16px
    // The size (width and height) or the person icon should be
    //   2 * R * sin (Pi / 4) = R * sqrt(2)
    // to place it inside the circle of radius R.
    const iconSize = Math.sqrt(2) * seatRadius;
    const iconScale = iconSize / 16;
    // The positioning starts from 0, so the shift should be decremented by 1
    const iconShift = (2 * seatRadius - iconSize) / 2 - 1;
    const peoplePath =
      'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z';
    const seatSvgGroup = this.seatsGroup.group();
    seatSvgGroup
      .id(`${SVG_SEAT_ID_PREFIX}${seat.id}`)
      .addClass(isActive ? 'floor-plan__seat--active' : 'floor-plan__seat');
    if (this.props.onSeatSelect) {
      seatSvgGroup.attr({ cursor: 'pointer' });
    }
    seatSvgGroup.circle(2 * seatRadius)
      .x(seat.position.x)
      .y(seat.position.y);
    if (seat.occupant) {
      seatSvgGroup.path(peoplePath)
        .addClass('floor-plan__person')
        .x(seat.position.x + iconShift)
        .y(seat.position.y + iconShift)
        .scale(iconScale);
    }
    if (isActive && this.props.onSeatMove) {
      seatSvgGroup
        .attr({ cursor: 'move' })
        // TODO: Limits are not applied to a seat
        .draggable({
          minX: 0,
          minY: 0,
          maxX: this.planElement.width(),
          maxY: this.planElement.height(),
        });
    }
  }

  render() {
    // <ReactResizeDetector handleWidth onResize={() => this.scalePlan()} />
    return (
      <Paper className={this.props.activeSeatId ? 'floor-plan__paper--small' : 'floor-plan__paper'} zDepth={1}>
        <h2 className="floor-plan__title">
          {this.props.officeName ? `${this.props.officeName} - ${this.props.floorName}` : ''}
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
