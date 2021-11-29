import React from 'react';
import '../styles/App.css';
import '../styles/Register.css';
import {Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, InputAdornment, IconButton, OutlinedInput, Typography} from '@mui/material';
import axios from 'axios';
import { Route } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';

class Register extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        occupation: '',
        address: '',
        phoneNumber: '',
        dateOfBirth: '',
        dateOfHire: '',
        department: '',
        departments: [{"ID": "0","Name": "FAILED TO POPULATE DEPTS"}],
        showPassword: false
      };
  }

  onDeptChange = (event) => {
    this.setState({department: event.target.value});
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => {return({showPassword: !prevState.showPassword})});
  }

  handleRegisterSubmit = e => {
    e.preventDefault();
    axios(
      "http://localhost:5000/register",
      {
        method: 'post',
        data: {
          Email: this.state.email,
          Password: this.state.password,
          FirstName: this.state.firstName,
          LastName: this.state.lastName,
          Occupation: this.state.occupation,
          Address: this.state.address,
          PhoneNumber: this.state.phoneNumber,
          DateOfBirth: this.state.dateOfBirth,
          DateOfHire: this.state.dateOfHire,
          DeptID: this.state.department
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          mode: 'no-cors'
        }
      } 
    );
  }

  componentDidMount = () => {
    axios(
      "http://localhost:5000/department",
      {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            mode: 'no-cors'
          }
        }).then((data) => {
        this.setState({departments: data.data});
      }
    );
  }

  render() {
      return(
        <Route exact path="/register">
          <Typography variant="h2" component="div" gutterBottom className='heading'>
            Registration
          </Typography>
          <Box
            noValidation
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={this.handleRegisterSubmit}
          >
            <div className='form-container'>
              <TextField
                required
                id="outlined-email-required"
                label="Email"
                placeholder="Email"
                value={this.state.email}
                onInput={ e => this.setState({email: e.target.value})}
              />
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onInput={e => this.setState({password: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.togglePasswordVisibility}
                        edge="end"
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <TextField
                required
                id="outlined-firstname-required"
                label="First Name"
                placeholder="First Name"
                value={this.state.firstName}
                onInput={ e => this.setState({firstName: e.target.value}) }
              />
              <TextField
                required
                id="outlined-lastname-required"
                label="Last Name"
                placeholder="Last Name"
                value={this.state.lastName}
                onInput={ e => this.setState({lastName: e.target.value}) }
              />
              <TextField
                required
                id="outlined-occupation-required"
                label="Occupation"
                placeholder="Occupation"
                value={this.state.occupation}
                onInput={ e => this.setState({occupation: e.target.value}) }
              />
              <TextField
                required
                id="outlined-address-required"
                label="Address"
                placeholder="Address"
                value={this.state.address}
                onInput={ e => this.setState({address: e.target.value}) }
              />
              <TextField
                required
                id="outlined-phonenumber-required"
                label="Phone Number"
                placeholder="Phone Number"
                value={this.state.phoneNumber}
                onInput={ e => this.setState({phoneNumber: e.target.value}) }
              />
              <DatePicker
                required
                id="outlined-dob-required"
                label="Date of Birth"
                value={this.state.dateOfBirth}
                onChange={ e => this.setState({dateOfBirth: e}) }
                renderInput={(params) => <TextField {...params} error={false} />}
              />
              <DatePicker
                required
                id="outlined-doh-required"
                label="Date of Hire"
                value={this.state.dateOfHire}
                onChange={ e => this.setState({dateOfHire: e}) }
                renderInput={(params) => <TextField {...params} error={false} />}
              />
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="label">Department *</InputLabel>
                <Select
                  required
                  labelId="label"
                  label="Department *"
                  id="outlined-department-required"
                  value={this.state.department}
                  onChange={this.onDeptChange}
                >
                  {this.state.departments.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" className="submit">
                Submit
              </Button>
            </div>
          </Box>
        </Route>
      );
  }
}

export default Register;