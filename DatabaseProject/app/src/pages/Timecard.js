import React from 'react';
import '../styles/App.css';
import '../styles/Timecard.css';
import {Box, TextField, Button, Typography} from '@mui/material';
import axios from 'axios';
import { Route } from "react-router-dom";
import { DatePicker } from '@mui/lab';
// import { DataGrid } from '@mui/x-data-grid';
import { format, isMonday, previousMonday, add } from 'date-fns';

class Timecard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startOfWeek: new Date(),
            monHoursWorked: '',
            tueHoursWorked: '',
            wedHoursWorked: '',
            thurHoursWorked: '',
            friHoursWorked: '',
            satHoursWorked: '',
            sunHoursWorked: '',
            monComments: '',
            tueComments: '',
            wedComments: '',
            thurComments: '',
            friComments: '',
            satComments: '',
            sunComments: '',

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
        }, this.getSelectedWeekTime);
        axios(
            "http://localhost:5000/hours",
            {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
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
        axios(
            "http://localhost:5000/hours",
            {
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                    mode: 'no-cors'
                },
                data: [
                    {
                        HoursWorked: this.state.monHoursWorked,
                        Comments: this.state.monComments,
                        WeekStartDate: this.state.startOfWeek,
                        Date: format(this.state.startOfWeek, "yyyy-MM-dd")
                    },
                    {
                        HoursWorked: this.state.tueHoursWorked,
                        Comments: this.state.tueComments,
                        WeekStartDate: this.state.startOfWeek,
                        Date: format(add(this.state.startOfWeek,{'days':1}),"yyyy-MM-dd")
                    },
                    {
                        HoursWorked: this.state.wedHoursWorked,
                        Comments: this.state.wedComments,
                        WeekStartDate: this.state.startOfWeek,
                        Date: format(add(this.state.startOfWeek,{'days':2}),"yyyy-MM-dd")
                    },
                    {
                        HoursWorked: this.state.thurHoursWorked,
                        Comments: this.state.thurComments,
                        WeekStartDate: this.state.startOfWeek,
                        Date: format(add(this.state.startOfWeek,{'days':3}),"yyyy-MM-dd")
                    },
                    {
                        HoursWorked: this.state.friHoursWorked,
                        Comments: this.state.friComments,
                        WeekStartDate: this.state.startOfWeek,
                        Date: format(add(this.state.startOfWeek,{'days':4}),"yyyy-MM-dd")
                    },
                    {
                        HoursWorked: this.state.satHoursWorked,
                        Comments: this.state.satComments,
                        WeekStartDate: this.state.startOfWeek,
                        Date: format(add(this.state.startOfWeek,{'days':5}),"yyyy-MM-dd")
                    },
                    {
                        HoursWorked: this.state.sunHoursWorked,
                        Comments: this.state.sunComments,
                        WeekStartDate: this.state.startOfWeek,
                        Date: format(add(this.state.startOfWeek,{'days':6}),"yyyy-MM-dd")
                    }
                ]
                
            }
        );
        this.getSelectedWeekTime();
    }
    
    getSelectedWeekTime = () => {
        axios(
            `http://localhost:5000/hours/${format(new Date(this.state.startOfWeek), "yyyy-MM-dd")}`,
            {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                    mode: 'no-cors'
                }
            }).then((data) => {
                this.handleContentPopulation(data.data);
            }
        );
    }

    handleContentPopulation = (data) => {
        const daysFound = [];
        data.forEach(entry => {
            switch(format(new Date(entry.date), 'EEEE')){
                case 'Monday':
                    this.setState({monHoursWorked: entry.hoursWorked, monComments: entry.comments});
                    daysFound.push('Monday');
                break;
                case 'Tuesday':
                    this.setState({tueHoursWorked: entry.hoursWorked, tueComments: entry.comments});
                    daysFound.push('Tuesday');
                break;

                case 'Wednesday':
                    this.setState({wedHoursWorked: entry.hoursWorked, wedComments: entry.comments});
                    daysFound.push('Wednesday');
                break;
                case 'Thursday':
                    this.setState({thurHoursWorked: entry.hoursWorked, thurComments: entry.comments});
                    daysFound.push('Thursday');
                break;
                case 'Friday':
                    this.setState({friHoursWorked: entry.hoursWorked, friComments: entry.comments});
                    daysFound.push('Friday');
                break;
                case 'Saturday':
                    this.setState({satHoursWorked: entry.hoursWorked, satComments: entry.comments});
                    daysFound.push('Saturday');
                break;
                case 'Sunday':
                    this.setState({sunHoursWorked: entry.hoursWorked, sunComments: entry.comments});
                    daysFound.push('Sunday');
                break;
            }
        });

        if(!daysFound.includes('Monday')){
            this.setState({monHoursWorked: '', monComments: ''});
        }
        if(!daysFound.includes('Tuesday')){
            this.setState({tueHoursWorked: '', tueComments: ''});
        }
        if(!daysFound.includes('Wednesday')){
            this.setState({wedHoursWorked: '', wedComments: ''});
        }
        if(!daysFound.includes('Thursday')){
            this.setState({thurHoursWorked: '', thurComments: ''});
        }
        if(!daysFound.includes('Friday')){
            this.setState({friHoursWorked: '', friComments: ''});
        }
        if(!daysFound.includes('Saturday')){
            this.setState({satHoursWorked: '', satComments: ''});
        }
        if(!daysFound.includes('Sunday')){
            this.setState({sunHoursWorked: '', sunComments: ''});
        }
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
                    <div className='timecard-inputs'>
                        <span className='week'>
                            <DatePicker
                                label="Week"
                                value={this.state.startOfWeek}
                                onChange={ e => this.setState({startOfWeek: isMonday(e) ? e : new Date(previousMonday(e))}, this.getSelectedWeekTime) }
                                renderInput={(params) => <TextField {...params} error={false} />}
                            />
                        </span>
                        <TextField
                            style = {{width: 180}}
                            label={this.state.startOfWeek !== '' ? format(this.state.startOfWeek,"eeee, MM/dd/yy") : ''}
                            placeholder="Hours Worked"
                            value={this.state.monHoursWorked}
                            onInput={ e => this.setState({monHoursWorked: e.target.value}) }
                        />
                        <TextField
                            label="Comments"
                            placeholder="Comments"
                            value={this.state.monComments}
                            onInput={ e => this.setState({monComments: e.target.value}) }
                        />
                        <TextField
                            style = {{width: 180}}
                            label={this.state.startOfWeek !== '' ? format(add(this.state.startOfWeek,{'days':1}),"eeee, MM/dd/yy") : ''}
                            placeholder="Hours Worked"
                            value={this.state.tueHoursWorked}
                            onInput={ e => this.setState({tueHoursWorked: e.target.value}) }
                        />
                        <TextField
                            label="Comments"
                            placeholder="Comments"
                            value={this.state.tueComments}
                            onInput={ e => this.setState({tueComments: e.target.value}) }
                        />
                        <TextField
                            style = {{width: 180}}
                            label={this.state.startOfWeek !== '' ? format(add(this.state.startOfWeek,{'days':2}),"eeee, MM/dd/yy") : ''}
                            placeholder="Hours Worked"
                            value={this.state.wedHoursWorked}
                            onInput={ e => this.setState({wedHoursWorked: e.target.value}) }
                        />
                        <TextField
                            label="Comments"
                            placeholder="Comments"
                            value={this.state.wedComments}
                            onInput={ e => this.setState({wedComments: e.target.value}) }
                        />
                        <TextField
                            style = {{width: 180}}
                            label={this.state.startOfWeek !== '' ? format(add(this.state.startOfWeek,{'days':3}),"eeee, MM/dd/yy") : ''}
                            placeholder="Hours Worked"
                            value={this.state.thurHoursWorked}
                            onInput={ e => this.setState({thurHoursWorked: e.target.value}) }
                        />
                        <TextField
                            label="Comments"
                            placeholder="Comments"
                            value={this.state.thurComments}
                            onInput={ e => this.setState({thurComments: e.target.value}) }
                        />
                        <TextField
                            style = {{width: 180}}
                            label={this.state.startOfWeek !== '' ? format(add(this.state.startOfWeek,{'days':4}),"eeee, MM/dd/yy") : ''}
                            placeholder="Hours Worked"
                            value={this.state.friHoursWorked}
                            onInput={ e => this.setState({friHoursWorked: e.target.value}) }
                        />
                        <TextField
                            label="Comments"
                            placeholder="Comments"
                            value={this.state.friComments}
                            onInput={ e => this.setState({friComments: e.target.value}) }
                        />
                        <TextField
                            style = {{width: 180}}
                            label={this.state.startOfWeek !== '' ? format(add(this.state.startOfWeek,{'days':5}),"eeee, MM/dd/yy") : ''}
                            placeholder="Hours Worked"
                            value={this.state.satHoursWorked}
                            onInput={ e => this.setState({satHoursWorked: e.target.value}) }
                        />
                        <TextField
                            label="Comments"
                            placeholder="Comments"
                            value={this.state.satComments}
                            onInput={ e => this.setState({satComments: e.target.value}) }
                        />
                        <TextField
                            style = {{width: 180}}
                            label={this.state.startOfWeek !== '' ? format(add(this.state.startOfWeek,{'days':6}),"eeee, MM/dd/yy") : ''}
                            placeholder="Hours Worked"
                            value={this.state.sunHoursWorked}
                            onInput={ e => this.setState({sunHoursWorked: e.target.value}) }
                        />
                        <TextField
                            label="Comments"
                            placeholder="Comments"
                            value={this.state.sunComments}
                            onInput={ e => this.setState({sunComments: e.target.value}) }
                        />
                        <Button type="submit" className="submit">
                            Save
                        </Button>
                        <Button  className="approval">
                            Request Approval
                        </Button>
                    </div>
                </Box>
                {/* <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    disableColumnFilter
                    rows={this.state.rows}
                    columns={this.columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
                </div> */}
            </Route>
        );
    }
}

export default Timecard;