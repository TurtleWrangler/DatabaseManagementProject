import React from 'react';
import './App.css';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import {Box, CssBaseline, TextField, Button} from '@mui/material';
import Navbar from './Navbar';
import { ThemeProvider } from '@mui/styles';
import theme from './theme';
// import axios from 'axios';
import { Route, Link } from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      registerEmail: '',
      registerPassword: '',
      firstName: '',
      lastName: '',
      occupation: '',
      address: '',
      phoneNumber: '',
      dateOfBirth: '',
      dateOfHire: '',
      hoursWorked: '',
      comments: ''
    };
  }

  handleLogInSubmit = (event) => {
    event.preventDefault();
    console.log( 'Email:', this.state.email, 'Password: ', this.state.password);
  }

  handleRegisterSubmit = (event) => {
    event.preventDefault();
    console.log( 'Email:', this.state.email, 'Password: ', this.state.password, 'First Name: ', this.state.firstName); 
  }

  handleHoursSubmitted = (event) => {
    event.preventDefault();
    console.log(); 
  }

  componentDidMount = () => {
    const date = new Date();
    console.log("test");
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          
          <Navbar />
          <Route exact path="/">
            <Button><Link to="/sign-in">Sign-In</Link></Button>
            <Button><Link to="/register">Register</Link></Button>
          </Route>
          
          <Register />
          <SignIn />
          <Route exact path="/timecard">
            
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={this.handleHoursSubmitted}
            >
            <TextField
                required
                id="outlined-required"
                label={`Hours for`}
                placeholder="Hours Worked"
                value={this.state.hoursWorked}
                onInput={ e => this.setState({hoursWorked: e.target.value}) }
            />
            <TextField
                required
                id="outlined-required"
                label="Comments"
                placeholder="Comments"
                value={this.state.comments}
                onInput={ e => this.setState({comments: e.target.value}) }
            />
            </Box>
          </Route>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
