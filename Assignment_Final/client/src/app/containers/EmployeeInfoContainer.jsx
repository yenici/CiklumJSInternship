import React from 'react';
import { connect } from 'react-redux';

import { getEmployee } from '../actions/spacePlannerActions';
import EmployeeInfo from '../components/EmployeeInfo.jsx';

class EmployeeInfoContainer extends React.Component {
  componentWillMount() {
    this.props.fetchEmployeeInfo(this.props.occupant);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.occupant !== nextProps.occupant) {
      this.props.fetchEmployeeInfo(nextProps.occupant);
    }
  }
  render() {
    if (this.props.employee) {
      return (
        <EmployeeInfo
          name={this.props.employee.name}
          email={this.props.employee.email}
          photo={this.props.employee.photo}
        />
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  occupant: state.spacePlanner.activeSeat.occupant,
  employee: state.spacePlanner.activeOccupant,
});

const mapDispatchToProps = dispatch => ({
  fetchEmployeeInfo: employeeId => dispatch(getEmployee(employeeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfoContainer);
