import React from 'react';
import '../App.css';
import {Box, TextField, Button, Typography} from '@mui/material';
import axios from 'axios';
import { Route } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/lab';
import { format, isMonday, previousMonday, add } from 'date-fns';

class Timecard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hoursWorked: '',
            comments: '',
            startOfWeek: new Date(),
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
                width: 200
            }
        ]

        this.currentRowId = 0;
    }

    componentDidMount = () => {
        this.setState(() => {
            const today = new Date();
            return {startOfWeek: isMonday(today) ? today : new Date(previousMonday(today))};
        });
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
    
    getSelectedWeekTime = () => {
        axios(
            `http://localhost:5000/hours/${format(new Date(this.state.startOfWeek), "yyyy-MM-dd")}`,
            {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                mode: 'no-cors'
                }
            }).then((data) => {

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
                        label="Week"
                        value={this.state.startOfWeek}
                        onChange={ e => this.setState({startOfWeek: isMonday(e) ? e : new Date(previousMonday(e))}, this.getSelectedWeekTime) }
                        renderInput={(params) => <TextField {...params} error={false} />}
                    />
                    <TextField
                        style = {{width: 180}}
                        label={this.state.startOfWeek != '' ? format(this.state.startOfWeek,"eeee, MM/dd/yy") : ''}
                        placeholder="Hours Worked"
                        value={this.state.hoursWorked}
                        onInput={ e => this.setState({hoursWorked: e.target.value}) }
                    />
                    <TextField
                        style = {{width: 180}}
                        label={this.state.startOfWeek != '' ? format(add(this.state.startOfWeek,{'days':1}),"eeee, MM/dd/yy") : ''}
                        placeholder="Hours Worked"
                        value={this.state.hoursWorked}
                        onInput={ e => this.setState({hoursWorked: e.target.value}) }
                    />
                    <TextField
                        style = {{width: 180}}
                        label={this.state.startOfWeek != '' ? format(add(this.state.startOfWeek,{'days':2}),"eeee, MM/dd/yy") : ''}
                        placeholder="Hours Worked"
                        value={this.state.hoursWorked}
                        onInput={ e => this.setState({hoursWorked: e.target.value}) }
                    />
                    <TextField
                        style = {{width: 180}}
                        label={this.state.startOfWeek != '' ? format(add(this.state.startOfWeek,{'days':3}),"eeee, MM/dd/yy") : ''}
                        placeholder="Hours Worked"
                        value={this.state.hoursWorked}
                        onInput={ e => this.setState({hoursWorked: e.target.value}) }
                    />
                    <TextField
                        style = {{width: 180}}
                        label={this.state.startOfWeek != '' ? format(add(this.state.startOfWeek,{'days':4}),"eeee, MM/dd/yy") : ''}
                        placeholder="Hours Worked"
                        value={this.state.hoursWorked}
                        onInput={ e => this.setState({hoursWorked: e.target.value}) }
                    />
                    <TextField
                        style = {{width: 180}}
                        label={this.state.startOfWeek != '' ? format(add(this.state.startOfWeek,{'days':5}),"eeee, MM/dd/yy") : ''}
                        placeholder="Hours Worked"
                        value={this.state.hoursWorked}
                        onInput={ e => this.setState({hoursWorked: e.target.value}) }
                    />
                    <TextField
                        style = {{width: 180}}
                        label={this.state.startOfWeek != '' ? format(add(this.state.startOfWeek,{'days':6}),"eeee, MM/dd/yy") : ''}
                        placeholder="Hours Worked"
                        value={this.state.hoursWorked}
                        onInput={ e => this.setState({hoursWorked: e.target.value}) }
                    />
                    <TextField
                        label="Comments"
                        placeholder="Comments"
                        value={this.state.comments}
                        onInput={ e => this.setState({comments: e.target.value}) }
                    />
                    <br/>
                    <Button type="submit" className="submit">
                        Save
                    </Button>
                    <Button  className="undo">
                        Undo
                    </Button>
                </Box>
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid
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