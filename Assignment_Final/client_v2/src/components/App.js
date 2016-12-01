import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const App = function App(props) {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar title="Ciklum Space" />
        <div style={{margin: '0.5em'}}>{props.children}</div>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
