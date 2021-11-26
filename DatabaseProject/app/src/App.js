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
import { DataGrid } from '@mui/x-data-grid';

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
      comments: '',
      token: ''
    };
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
    if(!this.state.token) {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <Navbar isLoggedIn={false}/>
            <SignIn />
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
          <Route exact path="/">
            {/* <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            /> */}
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
