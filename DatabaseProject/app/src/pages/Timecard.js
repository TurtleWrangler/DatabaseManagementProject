import React from 'react';
import '../App.css';
import {Box, TextField, Button, Typography} from '@mui/material';
import axios from 'axios';
import { Route } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/lab';

class Timecard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hoursWorked: '',
            comments: '',
            startOfWeek: '',
            rows: [],
            timeEntry: [{"ID": "0","Date": "FAILED TO POPULATE TIME ENTRIES","Hours Worked": "FAILED TO POPULATE TIME ENTRIES","Comments": "FAILED TO POPULATE TIME ENTRIES","Submission Time": "FAILED TO POPULATE TIME ENTRIES","Week Start Date": "FAILED TO POPULATE TIME ENTRIES"}]
        };

        this.columns = [
            { 
                field: 'id',
                headerName: 'ID', 
                width: 100 
            },
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
            }
        ]

        this.currentRowId = 0;
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
                data.data.map(row => {
                    row.id = this.currentRowId;
                    ++this.currentRowId;
                    return row;
                });
                this.setState({rows: data.data});
            }
        );
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
            }
          } 
        );
    }

    render() {
        return(
            <Route exact path="/timecard">
                <Typography variant="h2" component="div" gutterBottom className='heading'>
                    Timecard
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleHoursSubmitted}
                >
                    <DatePicker
                        required
                        id="selected-week"
                        label="Week"
                        value={this.state.startOfWeek}
                        onChange={ e => this.setState({startOfWeek: e}) }
                        renderInput={(params) => <TextField {...params} error={false} />}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label={`Monday ${this.state.startOfWeek+1}`}
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
                    disableColumnFilter
                    rows={this.state.rows}
                    columns={this.columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
                </div>
            </Route>
        );
    }
}

export default Timecard;