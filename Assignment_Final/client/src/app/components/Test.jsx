import React from 'react';
// import { Link } from 'react-router';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SpacePlannerContainer from '../containers/SpacePlannerContainer.jsx';

class Test extends React.Component {
  constructor(params) {
    super(params);
    this.state = { panelVisible: true };
  }
  render() {
    const wrapperStyle = {
      background: '#fff',
      minWidth: '1024px',
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexFlow: 'row no-wrap',
      justifyContent: 'space-around',
      alignItems: 'stretch',
    };
    const panelStyle = {
      margin: '1rem 0.5rem 1rem 0',
      padding: '0.5rem',
      backgroundColor: '#4e4e4e',
      borderRadius: '5px',
      flex: '1 25%',
      justifyContent: 'spacebetween',
    };
    return (
      <div style={wrapperStyle}>
        <SpacePlannerContainer />
        {
          this.state.panelVisible
            ?
            <div style={panelStyle} key="id">
              <h3>Headquaters of Ciklum in Ukraine</h3>
              <h4>5th Floor</h4>
              <button className="primary">New seat</button>
              <div style={{ display: 'flex', flexFlow: 'column' }}>
                <div style={{ display: 'flex', flexFlow: 'row no-wrap', justifyContent: 'flex-start', }}>
                  <div>
                    <img
                      src="http://192.168.0.2:8080/api/employee/photo/581aeb27f241ec0037e875b2"
                      alt="Torben"
                      width="100px"
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                  <div>Anna<br />Ryzhova</div>
                </div>
                <div>e-mail: anna.ryzhova@ciklum.com</div>
              </div>
              <div style={{ verticalAlign: 'center' }}>
                <img
                  src="http://192.168.0.2:8080/api/employee/photo/581aeb27f241ec0037e875b2"
                  alt="Torben"
                  width="30px"
                  style={{ borderRadius: '50%' }}
                />
                Anna Ryzhova
              </div>
              <button className="primary">Save</button>
              <button>Cancel</button>
            </div>
            : null
        }
      </div>
    );
  }
}

export default Test;
