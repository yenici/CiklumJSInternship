import React, { PropTypes } from 'react';
import svgjs from 'svg.js';
import draggable from 'svg.draggable.js';

const MAX_ZOOM_SCALE = 0.95;
const SEAT_COLOR = 'rgb(75, 168, 213)';
const SEAT_COLOR_FREE = 'rgb(233, 233, 233)';
const SEAT_COLOR_ACTIVE = 'rgb(245, 127, 32)';
const SEAT_COLOR_STROKE = 'rgb(84, 69, 98)';

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);
    this.svgCanvas = null;
  }
  componentDidMount() {
    this.svgCanvas = svgjs('cs-floor-plan').size('100%', '100%');
    this.svgCanvas.click((e) => {
      e.stopPropagation();
      if (
        e.target.id.substr(0, 8) === 'cs_seat_'
        && (!this.props.activeSeat || this.props.activeSeat.id !== e.target.id.substr(8))
        && !this.props.modalMode
      ) {
        this.props.onSeatSelect(e.target.id.substr(8));
      }
    });
    this.svgCanvas.on('touchstart', (e) => {
      e.stopPropagation();
      if (
        e.target.id.substr(0, 8) === 'cs_seat_'
        && (!this.props.activeSeat || this.props.activeSeat.id !== e.target.id.substr(8))
        && !this.props.modalMode
      ) {
        this.props.onSeatSelect(e.target.id.substr(8));
      }
    });
  }
  shouldComponentUpdate(nextProps) {
    this.svgCanvas.clear();
    this.svgCanvas.svg(nextProps.plan); // Show the floor plan
    const svgGroup = this.svgCanvas.group(); // A group for dragging and zooming
    const floorPlan = svgjs.get('floorplan');
    floorPlan.addTo(svgGroup);
    // Align the floor plan in the center of a DIV
    svgGroup.x((this.svgCanvas.viewbox().width - floorPlan.width()) / 2);
    svgGroup.y((this.svgCanvas.viewbox().height - floorPlan.height()) / 2);
    // Zoom the floor plan according to the DIV's size
    const zoom = Math.min(
        this.svgCanvas.viewbox().width / floorPlan.width(),
        this.svgCanvas.viewbox().height / floorPlan.height()) * MAX_ZOOM_SCALE;
    svgGroup.scale(zoom, zoom);
    // group.draggable();
    // Render non-active seats
    nextProps.seats.forEach((seat) => {
      if (!nextProps.activeSeat || seat.id !== nextProps.activeSeat.id) {
        this.svgCanvas.circle(2 * nextProps.seatRadius)
          .fill(seat.occupant ? SEAT_COLOR : SEAT_COLOR_FREE)
          .attr({
            strokeWidth: 1,
            stroke: SEAT_COLOR_STROKE,
            // cursor: this.props.modalMode ? 'default' : 'pointer',
            cursor: 'pointer',
          })
          .id(`cs_seat_${seat.id}`)
          .x(seat.position.x)
          .y(seat.position.y)
          .addTo(svgGroup);
      }
    });
    // Reander active seat
    if (nextProps.activeSeat) {
      const svgSeat = this.svgCanvas.circle(2 * nextProps.seatRadius)
        .fill(SEAT_COLOR_ACTIVE)
        .attr({
          strokeWidth: 1,
          stroke: SEAT_COLOR_STROKE,
          cursor: nextProps.enableDnD ? 'move' : 'pointer',
        })
        .id(`cs_seat_${nextProps.activeSeat.id}`)
        .x(nextProps.activeSeat.position.x)
        .y(nextProps.activeSeat.position.y)
        .addTo(svgGroup);
      if (nextProps.enableDnD) {
        svgSeat.draggable({
          minX: 0,
          minY: 0,
          maxX: floorPlan.width(),
          maxY: floorPlan.height(),
        });
        const onSeatMove = this.props.onSeatMove;
        svgSeat.on('dragend', function () {
          onSeatMove(this.x(), this.y());
        });
      }
    }
    return false;
  }
  render() {
    return (
      <div id="cs-floor-plan" className="floor-plan" />
    );
  }
}

FloorPlan.propTypes = {
  plan: PropTypes.string.isRequired,
  seatRadius: PropTypes.number.isRequired,
  seats: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  activeSeat: PropTypes.shape({
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
  enableDnD: PropTypes.bool,
  modalMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object, // for null
  ]),
  onSeatSelect: PropTypes.func,
  onSeatMove: PropTypes.func,
};

export default FloorPlan;
