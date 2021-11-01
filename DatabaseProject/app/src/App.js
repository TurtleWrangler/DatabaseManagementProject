import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

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
      <div className="App">
        <header className="header">
          <p>
            Time Management System
          </p>
        </header>
        <Router>
          <Route exact path="/">
            <Button><Link to="/sign-in">Sign-In</Link></Button>
            <Button><Link to="/register">Register</Link></Button>
          </Route>
          <Route exact path="/sign-in">
            <Button><Link to="/register">Register</Link></Button>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={this.handleLogInSubmit}
            >
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Required Email"
                  placeholder="Email"
                  value={this.state.email}
                  onInput={ e => this.setState({email: e.target.value})}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Password"
                  placeholder="Password"
                  value={this.state.password}
                  onInput={ e => this.setState({password: e.target.value})}
                />
              </div>
              <Button type="submit"component={Link} to={'/information'}>Submit</Button>
            </Box>
          </Route>
          <Route exact path="/register">
            <Button><Link to="/sign-in">Sign-In</Link></Button>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={this.handleRegisterSubmit}
            >
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Required Email"
                  placeholder="Email"
                  value={this.state.registerEmail}
                  onInput={ e => this.setState({registerEmail: e.target.value})}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Password"
                  placeholder="Password"
                  value={this.state.registerPassword}
                  onInput={ e => this.setState({registerPassword: e.target.value}) }
                /><br />
                <TextField
                  required
                  id="outlined-required"
                  label="Required First Name"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onInput={ e => this.setState({firstName: e.target.value}) }
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Last Name"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onInput={ e => this.setState({lastName: e.target.value}) }
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Occupation"
                  placeholder="Occupation"
                  value={this.state.occupation}
                  onInput={ e => this.setState({occupation: e.target.value}) }
                /><br />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Address"
                  placeholder="Address"
                  value={this.state.address}
                  onInput={ e => this.setState({address: e.target.value}) }
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Phone Number"
                  placeholder="Phone Number"
                  value={this.state.phoneNumber}
                  onInput={ e => this.setState({phoneNumber: e.target.value}) }
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Date of Birth"
                  placeholder="Date of Birth"
                  value={this.state.dateOfBirth}
                  onInput={ e => this.setState({dateOfBirth: e.target.value}) }
                /><br />
                <TextField
                  required
                  id="outlined-required"
                  label="Required Date of Hire"
                  placeholder="Date of Hire"
                  value={this.state.dateOfHire}
                  onInput={ e => this.setState({dateOfHire: e.target.value}) }
                />
              </div>
              <Button>
                <Link to="/sign-in">
                  Submit
                </Link>
              </Button>
            </Box>
          </Route>
          <Route exact path="/information">
            <Button><Link to="/sign-in">Sign-In</Link></Button>
            <Button><Link to="/register">Register</Link></Button>
            <br/>
            <Button><Link to="/check-hours">Check Hours</Link></Button>
            <Button><Link to="/create-hours">Create Timesheet</Link></Button>
          </Route>
          <Route exact path="/create-hours">
            <Button><Link to="/information">Home Page</Link></Button>
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
        </Router>
      </div>
    );
  }
}

export default App;
