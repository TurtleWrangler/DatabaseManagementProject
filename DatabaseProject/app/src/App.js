import React from 'react';
import './styles/App.css';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Timecard from './pages/Timecard';
import History from './pages/History';
import User from './pages/User';
import {CssBaseline} from '@mui/material';
import Navbar from './Navbar';
import { ThemeProvider } from '@mui/styles';
import theme from './theme';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      isAdmin: false
    };
  }

  setTokenAndAdmin = (newToken,adminStatus) => {
    this.setState({token: newToken, isAdmin: adminStatus});
  }

  render() {
    if(!this.state.token) {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <Navbar isLoggedIn={false} isAdmin={this.state.isAdmin}/>
            <SignIn setToken={this.setTokenAndAdmin}/>
            <Register />
          </div>
        </ThemeProvider>
        
      )
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar isLoggedIn={true} isAdmin={this.state.isAdmin}/>          
          <SignIn setToken={this.setTokenAndAdmin}/>
          <Timecard token={this.state.token}/>
          <History token={this.state.token}/>
          {this.state.isAdmin && <User token={this.state.token}/>}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
