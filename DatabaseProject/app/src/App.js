import React from 'react';
import './App.css';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import {Box, CssBaseline, TextField, Button} from '@mui/material';
import Navbar from './Navbar';
import { ThemeProvider } from '@mui/styles';
import theme from './theme';
import axios from 'axios';
import { Route, Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hoursWorked: '',
      comments: '',
      rows: [{"id": "1","employee_id": "62984939-89f0-41d3-ba0a-b19c313ea645","date": "2021-11-27","hours_worked": "40.00","comments": "You are really Great!!!","submission_time": "2021-11-27 14:45:42","week_start_date": "2021-11-22"}],
      columns: [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'employee_id',
          headerName: 'Employee ID',
          width: 200,
        },
        {
          field: 'date',
          headerName: 'Date',
          width: 200,
        },
        {
          field: 'hours_worked',
          headerName: 'Hours Worked',
          width: 200,
        },
        {
          field: 'comments',
          headerName: 'Comments',
          width: 200,
        },
        {
          field: 'submission_time',
          headerName: 'Submission Time',
          width: 200,
        },
        {
          field: 'week_start_date',
          headerName: 'Week Start Date',
          width: 200,
        },
      ],
      timeEntry: [{"ID": "0","Date": "FAILED TO POPULATE TIME ENTRIES","Hours Worked": "FAILED TO POPULATE TIME ENTRIES","Comments": "FAILED TO POPULATE TIME ENTRIES","Submission Time": "FAILED TO POPULATE TIME ENTRIES","Week Start Date": "FAILED TO POPULATE TIME ENTRIES"}],
      token: ''
    };
  }

  handleHoursSubmitted = (event) => {
    event.preventDefault();
    console.log(this.state.hoursWorked);
    console.log(this.state.comments);
    axios(
      "http://localhost:5000/hours",
      {
        method: 'post',
        data: {
          HoursWorked: this.state.hoursWorked,
          Comments: this.state.comments
        },
      } 
    );
  }

  componentDidMount = () => {
    axios(
      "http://localhost:5000/hours",
      {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            mode: 'no-cors'
          }
        }).then((data) => {
        this.setState({timeEntry: data.data});
        console.log(data.data);
      }
    );
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
          <SignIn setToken={this.setToken}/>
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
            <br/>
            <Button type="submit" className="submit">
                Submit
            </Button>
            </Box>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={this.state.rows}
                columns={this.state.columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </Route>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
