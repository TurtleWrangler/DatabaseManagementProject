import React from 'react';
import '../App.css';
import '../Register.css';
import {Box, TextField, Button} from '@mui/material';
// import axios from 'axios';
import { Route } from "react-router-dom";

class Register extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        registerEmail: '',
        registerPassword: '',
        firstName: '',
        lastName: '',
        occupation: '',
        address: '',
        phoneNumber: '',
        dateOfBirth: '',
        dateOfHire: ''
      };
  }

  render() {
      return(
        <Route exact path="/register">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={this.handleRegisterSubmit}
          >
            <div className='form-container'>
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
              />
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
              />
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
              />
              <TextField
                required
                id="outlined-required"
                label="Required Date of Hire"
                placeholder="Date of Hire"
                value={this.state.dateOfHire}
                onInput={ e => this.setState({dateOfHire: e.target.value}) }
              />
              <Button type="submit">
                Submit
              </Button>
            </div>
          </Box>
        </Route>
      );
  }
}

export default Register;