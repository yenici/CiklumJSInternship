import React, { PropTypes } from 'react';

const ModalWindow = () => (
  <div>
    <div className="md-modal md-effect-10" id="modal-10">
      <div className="md-content">
        <h3>Modal Dialog</h3>
        <div>
          <p>This is a modal window. You can do the following things with it:</p>
          <ul>
            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
            <li><strong>Close:</strong> click on the button below to close the modal.</li>
          </ul>
          <button className="md-close">Close me!</button>
        </div>
      </div>
    </div>
    <div className="md-overlay" acceptCharset="" />
  </div>
);

ModalWindow.propTypes = {
  active: PropTypes.bool,
};

export default ModalWindow;
