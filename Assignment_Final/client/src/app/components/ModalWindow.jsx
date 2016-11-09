import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { hideErrorWindow } from '../actions/spacePlannerActions';

const ModalWindow = ({ message, onClose }) => {
  if (message) {
    return (
      <div>
        <div className="md-modal md-effect-10 md-show" id="modal-10">
          <div className="md-content">
            <h4>Error</h4>
            <div>
              <p>{message}</p>
              <Link to="/" className="pure-button" onClick={onClose}>Close</Link>
            </div>
          </div>
        </div>
        <div className="md-overlay" acceptCharset="" />
      </div>
    );
  }
  return null;
};

ModalWindow.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};

const mapStateToProps = state => ({
  message: state.spacePlanner.errors.length > 0 ? state.spacePlanner.errors[0] : null,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(hideErrorWindow()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
