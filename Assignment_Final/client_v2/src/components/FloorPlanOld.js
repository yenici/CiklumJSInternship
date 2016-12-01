/* global window: true*/

import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { cyan500, grey300, orange500, grey900 } from 'material-ui/styles/colors';
import cssModules from 'react-css-modules';
import svgjs from 'svg.js';
import draggable from 'svg.draggable.js';
import ReactResizeDetector from 'react-resize-detector';

import styles from './FloorPlanOld.scss';

const CANVAS_ID_PREFIX = 'cs_f_id';
const SEAT_ID_PREFIX = 'cs_s_id';
const SEAT_COLOR = cyan500;
const SEAT_FREE_COLOR = grey300;
const SEAT_ACTIVE_COLOR = orange500;
const SEAT_STROKE_COLOR = grey900;
const SEAT_STROKE_WIDTH = 1;
const PLAN_MAX_ZOOM_SCALE = 0.95;

class FloorPlan extends React.Component {

  constructor(props) {
    super(props);
    this.svgContainer = {
      id: `${CANVAS_ID_PREFIX}${Math.random().toString().substr(2)}`,
      element: null,
    };
    this.state = {
      plan: {
        width: 0,
        height: 0,
      },
      svgGroup: null,
      activeSeat: {
        id: props.activeSeatId,
        position: { x: 0, y: 0 },
      },
    };
  }

  componentDidMount() {
    this.svgContainer.element = svgjs(this.svgContainer.id).size('100%', '100%').spof();
    svgjs.on(window, 'resize', () => {
      this.svgContainer.element.spof();
      this.scalePlan();
    });
    // this.canvas.svgElement.on('click', this.clickOnFloorPlan.bind(this));
    // this.canvas.svgElement.on('touchstart', this.clickOnFloorPlan.bind(this));
  }

  scalePlan() {
    // Restore the scale
    this.svgContainer.element.scale(1, 1);
    // Align the floor plan in the center of a DIV
    this.svgContainer.element
      .x((this.svgContainer.element.viewbox().width - this.state.plan.width) / 2);
    this.svgContainer.element
      .y((this.svgContainer.element.viewbox().height - this.state.plan.height) / 2);
    // Zoom the floor plan according to the DIV's size
    const zoom = PLAN_MAX_ZOOM_SCALE * Math.min(
        this.svgContainer.element.viewbox().width / this.state.plan.width,
        this.svgContainer.element.viewbox().height / this.state.plan.height);
    this.state.svgGroup.scale(zoom, zoom);
  }

  renderPlan(plan, seatRadius, seats, activeSeatId) {
    let activeSeat;
    // this.state = {
    //   plan: {
    //     width: 0,
    //     height: 0,
    //   },
    //   svgGroup: null,
    //   activeSeat: {
    //     id: props.activeSeatId,
    //     position: { x: 0, y: 0 },
    //   },
    // };

    const newState = {};
    this.svgContainer.element.clear();
    // Show the floor plan
    this.svgContainer.element.svg(plan);
    // A group for dragging and zooming
    newState.svgGroup = this.svgContainer.element.group();
    // 'floorplan' is an ID inside svg for floor plan
    const floorPlan = svgjs.get('floorplan');
    floorPlan.addTo(newState.svgGroup);
    newState.plan = {
      width: floorPlan.width(),
      height: floorPlan.height(),
    };
    // this.scalePlan();
    // svgGroup.draggable();
    // Render non-active seats
    seats.forEach((seat) => {
      if (!activeSeatId || seat.id !== activeSeatId) {
        this.canvas.svgElement.circle(2 * seatRadius)
          .fill(seat.occupant ? SEAT_COLOR : SEAT_FREE_COLOR)
          .attr({
            strokeWidth: SEAT_STROKE_WIDTH,
            stroke: SEAT_STROKE_COLOR,
            // cursor: this.props.modalMode ? 'default' : 'pointer',
            cursor: 'pointer',
          })
          .id(`${SEAT_ID_PREFIX}${seat.id}`)
          .x(seat.position.x)
          .y(seat.position.y)
          .addTo(newState.svgGroup);
      } else if (seat.id === activeSeatId) {
        newState.activeSeat = {
          id: seat.id,
          position: seat.position,
        };
      }
    });
    // Render active seat
    if (newState.activeSeat.id) {
      const svgSeat = this.canvas.svgElement.circle(2 * seatRadius)
        .fill(SEAT_ACTIVE_COLOR)
        .attr({
          strokeWidth: SEAT_STROKE_WIDTH,
          stroke: SEAT_STROKE_COLOR,
          cursor: this.props.onSeatMove ? 'move' : 'pointer',
        })
        .id(`${SEAT_ID_PREFIX}${newState.activeSeat.id}`)
        .x(newState.activeSeat.position.x)
        .y(newState.activeSeat.position.y)
        .addTo(newState.svgGroup);
      if (this.props.onSeatMove) {
        svgSeat.draggable({
          minX: 0,
          minY: 0,
          maxX: floorPlan.width(),
          maxY: floorPlan.height(),
        });
        svgSeat.on('dragend', () => this.props.onSeatMove(svgSeat.x(), svgSeat.y()));
      }
    }
  }

  render() {
    return (
      <Paper styleName={this.state.activeSeat.id ? 'floor-plan__paper--small' : 'floor-plan__paper'} zDepth={1}>
        <h2 styleName="floor-plan__title">
          {this.props.officeName ? `${this.props.officeName} - ${this.props.floorName}` : ''}
        </h2>
        <div id={this.svgContainer.id} styleName="floor-plan__svg-wrapper" />
        <ReactResizeDetector handleWidth onResize={() => this.scalePlan()} />
      </Paper>
    );
  }
}

FloorPlan.propTypes = {
  officeName: PropTypes.string,
  floorName: PropTypes.string,
  plan: PropTypes.string,
  // seatRadius: PropTypes.number.isRequired,
  // seats: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.string.isRequired,
  //   position: PropTypes.shape({
  //     x: PropTypes.number.isRequired,
  //     y: PropTypes.number.isRequired,
  //   }),
  //   occupant: PropTypes.string,
  // })),
  activeSeatId: PropTypes.string,
  // onClickOnPlan: PropTypes.func,
  // onSeatMove: PropTypes.func,
};


class _FloorPlan extends React.Component {

  constructor(props) {
    super(props);
    this.canvas = {
      svgElement: null,
      elementId: `${CANVAS_ID_PREFIX}${Math.random().toString().substr(2)}`,
    };
    this.state = {
      svgGroup: null,
      planDimensions: {
        width: 0,
        height: 0,
      },
      activeSeat: {
        id: null,
        position: {
          x: 0,
          y: 0,
        },
      },
    };
  }

  componentDidMount() {
    this.canvas.svgElement = svgjs(this.canvas.svgElementId).size('100%', '100%').spof();
    svgjs.on(window, 'resize', () => {
      this.canvas.svgElement.spof();
      this.scalePlan();
    });
    // this.canvas.svgElement.on('click', this.clickOnFloorPlan.bind(this));
    // this.canvas.svgElement.on('touchstart', this.clickOnFloorPlan.bind(this));
  }

  componentDidUpdate() {
    this.renderPlan(
      this.props.plan,
      this.props.seatRadius,
      this.props.seats,
      this.props.activeSeatId);
  }

  clickOnFloorPlan(e) {
    this.props.onClickOnPlan(
      (e.target.id.substr(0, SEAT_ID_PREFIX.length) === SEAT_ID_PREFIX &&
      this.props.activeSeatId !== e.target.id.substr(SEAT_ID_PREFIX.length)) ?
        e.target.id.substr(SEAT_ID_PREFIX.length) : null);
  }

  scalePlan() {
    // Restore the scale
    this.svgGroup.scale(1, 1);
    // Align the floor plan in the center of a DIV
    this.svgGroup.x((this.svgCanvas.viewbox().width - this.dimensions.width) / 2);
    this.svgGroup.y((this.svgCanvas.viewbox().height - this.dimensions.height) / 2);
    // Zoom the floor plan according to the DIV's size
    const zoom = Math.min(this.svgCanvas.viewbox().width / this.dimensions.width,
        this.svgCanvas.viewbox().height / this.dimensions.height) * PLAN_MAX_ZOOM_SCALE;
    this.svgGroup.scale(zoom, zoom);
  }

  renderPlan(plan, seatRadius, seats, activeSeatId) {
    let activeSeat;
    const newState = {};
    this.canvas.svgElement.clear();
    // Show the floor plan
    this.canvas.svgElement.svg(plan);
    // A group for dragging and zooming
    newState.svgGroup = this.canvas.svgElement.group();
    // 'floorplan' is an ID inside svg for floor plan
    const floorPlan = svgjs.get('floorplan');
    floorPlan.addTo(newState.svgGroup);
    newState.planDimensions = {
      width: floorPlan.width(),
      height: floorPlan.height(),
    };
    this.scalePlan();
    // svgGroup.draggable();
    // Render non-active seats
    seats.forEach((seat) => {
      if (!activeSeatId || seat.id !== activeSeatId) {
        this.canvas.svgElement.circle(2 * seatRadius)
          .fill(seat.occupant ? SEAT_COLOR : SEAT_FREE_COLOR)
          .attr({
            strokeWidth: SEAT_STROKE_WIDTH,
            stroke: SEAT_STROKE_COLOR,
            // cursor: this.props.modalMode ? 'default' : 'pointer',
            cursor: 'pointer',
          })
          .id(`${SEAT_ID_PREFIX}${seat.id}`)
          .x(seat.position.x)
          .y(seat.position.y)
          .addTo(newState.svgGroup);
      } else if (seat.id === activeSeatId) {
        newState.activeSeat = {
          id: seat.id,
          position: seat.position,
        };
      }
    });
    // Render active seat
    if (newState.activeSeat.id) {
      const svgSeat = this.canvas.svgElement.circle(2 * seatRadius)
        .fill(SEAT_ACTIVE_COLOR)
        .attr({
          strokeWidth: SEAT_STROKE_WIDTH,
          stroke: SEAT_STROKE_COLOR,
          cursor: this.props.onSeatMove ? 'move' : 'pointer',
        })
        .id(`${SEAT_ID_PREFIX}${newState.activeSeat.id}`)
        .x(newState.activeSeat.position.x)
        .y(newState.activeSeat.position.y)
        .addTo(newState.svgGroup);
      if (this.props.onSeatMove) {
        svgSeat.draggable({
          minX: 0,
          minY: 0,
          maxX: floorPlan.width(),
          maxY: floorPlan.height(),
        });
        svgSeat.on('dragend', () => this.props.onSeatMove(svgSeat.x(), svgSeat.y()));
      }
    }
  }

  render() {
    return (
      <Paper styleName={this.props.activeSeatId ? 'floor-plan__paper--small' : 'floor-plan__paper'} zDepth={1}>
        <h2 styleName="floor-plan__title">
          {this.props.officeName ? `${this.props.officeName} - ${this.props.floorName}` : ''}
        </h2>
        <div id={this.canvasId} styleName="floor-plan__svg-wrapper" />
        <ReactResizeDetector handleWidth onResize={() => this.scalePlan()} />
      </Paper>
    );
  }

}

_FloorPlan.propTypes = {
  officeName: PropTypes.string,
  floorName: PropTypes.string,
  plan: PropTypes.string,
  seatRadius: PropTypes.number.isRequired,
  seats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    occupant: PropTypes.string,
  })),
  activeSeatId: PropTypes.string,
  onClickOnPlan: PropTypes.func,
  onSeatMove: PropTypes.func,
};

export default cssModules(FloorPlan, styles);
