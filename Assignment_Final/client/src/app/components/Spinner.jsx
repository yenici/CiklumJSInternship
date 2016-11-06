import React, { PropTypes } from 'react';

const Spinner = ({ active }) => (
  <div className="spinner__wrapper" style={{ display: active ? 'flex' : 'none' }}>
    <div className="spinner">
      <div className="rings">
        <div className="ring-1">
          <div className="ring-2">
            <div className="ring-3" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Spinner.propTypes = {
  active: PropTypes.bool,
};

export default Spinner;
