import svgjs from 'svg.js';
import 'svg.draggable.js';

import './FloorPlanSvg.css';

// 'floorplan' is an ID inside svg for a floor plan
const FLOOR_PLAN_ID = 'floorplan';
const SVG_SEAT_ID_PREFIX = 'cs_s_id';
const PLAN_MAX_ZOOM_SCALE = 0.95;

export default class FloorPlanSvg {

  constructor(elementId) {
    this.svgElement = svgjs(elementId)
      .size('100%', '100%')
      .spof();
    //   // svgjs.on(window, 'resize', () => {
    //   //   this.svgWrapper.element.spof();
    //   // });
    this.svgElement.on('click', e => {
      let selectedSeatId = null;
      // An ID of a seat has a special format and starts with SVG_SEAT_ID_PREFIX
      if (e.target.parentNode.id.substr(0, SVG_SEAT_ID_PREFIX.length) === SVG_SEAT_ID_PREFIX) {
        selectedSeatId = e.target.parentNode.id.substr(SVG_SEAT_ID_PREFIX.length);
      }
      if (selectedSeatId !== this.activeSeatId) {
        this.onSeatSelect(selectedSeatId);
      }
    });
    //   // this.svgElement.on('click', e => {
    //   //   this.seatsGroup.clear();
    //   // });
  }

  render({ plan, seats, seatRadius, activeSeatId, onSeatSelect, onSeatMove }) {
    if (this.plan !== plan || this.onSeatSelect !== onSeatSelect) {
      this.plan = plan;
      this.seats = seats;
      this.seatRadius = seatRadius;
      this.activeSeatId = activeSeatId;
      this.onSeatSelect = onSeatSelect;
      this.onSeatMove = onSeatMove;
      this.renderPlan();
      this.renderSeats();
    } else {
      if (this.seats !== seats
        || this.activeSeatId !== activeSeatId
        || this.seatRadius !== seatRadius
      ) {
        this.seats = seats;
        this.seatRadius = seatRadius;
        this.activeSeatId = activeSeatId;
        this.onSeatMove = onSeatMove;
        this.renderSeats();
      }
    }
  }

  // renderSvg(nextProps) {
  //   if (nextProps) {
  //     if (this.props.plan !== nextProps.plan) {
  //       this.renderPlan(nextProps);
  //       this.renderSeats(nextProps);
  //     } else {
  //       if (this.props.seatRadius !== nextProps.seatRadius) {
  //         this.renderSeats(nextProps);
  //       }
  //       if (this.props.seats !== nextProps.seats || this.props.activeSeatId !== nextProps.activeSeatId) {
  //         // The second condition is used to ensure that the active seat is the last
  //         // rendered set (overflow other seats)
  //         this.renderSeats(nextProps);
  //       }
  //     }
  //   }
  // }

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

  renderPlan() {
    if (this.svgElement && this.plan) {
      this.svgElement.clear();
      // Show the floor plan
      this.svgElement.svg(this.plan);
      // A group for dragging and zooming
      this.svgGroup = this.svgElement.group();
      this.planElement = svgjs.get(FLOOR_PLAN_ID);
      this.planElement.addTo(this.svgGroup);
      // A group for seats
      this.seatsGroup = this.planElement.group();
      this.seatsGroup.addTo(this.svgGroup);
      this.scalePlan();
    }
  }

  renderSeats() {
    if (this.seats) {
      this.seatsGroup && this.seatsGroup.clear();
      this.activeSeat = null;
      this.seats.forEach((seat) => {
        if (seat.id !== this.activeSeatId) {
          this.drawSeat(seat, this.seatRadius);
        } else {
          this.activeSeat = seat;
        }
      });
      if (this.activeSeat) {
        this.drawSeat(this.activeSeat, this.seatRadius, true);
      }
    }
  }

  drawSeat(seat, seatRadius, isActive) {
    const seatSvgGroup = this.seatsGroup.group();
    seatSvgGroup
      .id(`${SVG_SEAT_ID_PREFIX}${seat.id}`)
      .addClass(isActive ? 'floor-plan__seat--active' : 'floor-plan__seat');
    if (this.onSeatSelect) {
      seatSvgGroup.attr({ cursor: 'pointer' });
    }
    seatSvgGroup.circle(2 * seatRadius)
      .x(seat.position.x)
      .y(seat.position.y);
    if (seat.occupant) {
      // Original size of the person icon is 16px x 16px
      // The size (width and height) or the person icon should be
      //   2 * R * sin (Pi / 4) = R * sqrt(2)
      // to place it inside the circle of radius R.
      const iconOriginalSize = 16;
      const iconSize = Math.sqrt(2) * seatRadius;
      const iconScalingIndex = 0.9;
      const iconScale = iconScalingIndex * iconSize / iconOriginalSize;
      const peoplePath = `M${seat.position.x + seatRadius} ${seat.position.y + seatRadius}`
        .concat(
          'c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
        );
      seatSvgGroup.path(peoplePath)
        .addClass('floor-plan__person')
        .scale(iconScale);
    }
    if (isActive && this.onSeatMove) {
      seatSvgGroup
        .attr({ cursor: 'move' })
        // TODO: Limits are not applied to a seat
        .draggable({
          minX: 0,
          minY: 0,
          maxX: this.planElement.width(),
          maxY: this.planElement.height(),
        })
        // .on('dragend', e => console.info(this));
        // .on('dragstart', e => console.info(`${e.detail.p.x} ${e.detail.p.y}`))
        .on('dragend', e => console.info(`${e.detail.p.x - seatRadius} ${e.detail.p.y - seatRadius}`));
    }
  }

}