import React from 'react';
import './styles/App.css';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Timecard from './pages/Timecard';
import {CssBaseline} from '@mui/material';
import Navbar from './Navbar';
import { ThemeProvider } from '@mui/styles';
import theme from './theme';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: 'DEBUG'
    };
  }

  setToken = newToken => {
    this.setState({token: newToken});
  }

  render() {
    if(!this.state.token) {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <Navbar isLoggedIn={false}/>
            <SignIn setToken={this.setToken}/>
            <Register />
          </div>
        </ThemeProvider>
        
      )
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar isLoggedIn={true}/>          
          <SignIn setToken={this.setToken}/>
          <Timecard />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
