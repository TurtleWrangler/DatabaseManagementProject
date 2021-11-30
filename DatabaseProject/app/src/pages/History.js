import React from 'react';
import '../styles/App.css';
// import '../styles/Timecard.css';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Route } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/lab';
import { format, isMonday, previousMonday } from 'date-fns';

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            startOfDays: '',
            rows: []
        };

        this.columns = [
            { 
                field: 'id',
                headerName: 'ID', 
                width: 100 
            },
            {
                field: 'firstName',
                headerName: 'First Name',
                width: 200,
            },
            {
                field: 'lastName',
                headerName: 'Last Name',
                width: 200,
            },
            {
                field: 'date',
                headerName: 'Date',
                width: 200,
            },
            {
                field: 'hoursWorked',
                headerName: 'Hours Worked',
                width: 200,
            },
            {
                field: 'comments',
                headerName: 'Comments',
                width: 200,
            },
            {
                field: 'submissionTime',
                headerName: 'Submission Time',
                width: 200,
            },
            {
                field: 'weekStartDate',
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
                for(var i = 0; i < data.data.length; i++)
                {
                    data.data[i].date = format(new Date(data.data[i].date), "yyyy-MM-dd");
                    data.data[i].submissionTime = format(new Date(data.data[i].submissionTime), "hh-mm aa");
                    data.data[i].weekStartDate = format(new Date(data.data[i].weekStartDate), "yyyy-MM-dd");
                }
                this.setState({rows: data.data});
            }
        );
    }

    searchDate = () => {
        axios(
            `http://localhost:5000/hours/search/${format(new Date(this.state.startOfDays), "yyyy-MM-dd")}`,
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
                for(var i = 0; i < data.data.length; i++)
                {
                    data.data[i].date = format(new Date(data.data[i].date), "yyyy-MM-dd");
                    data.data[i].submissionTime = format(new Date(data.data[i].submissionTime), "hh-mm aa");
                    data.data[i].weekStartDate = format(new Date(data.data[i].weekStartDate), "yyyy-MM-dd");
                }
                this.setState({rows: data.data});
            }
        );
    }

    render() {
        return(
            <Route exact path="/history">
                <Typography variant="h2" component="div" gutterBottom className='heading'>
                    History
                </Typography>
                <DatePicker
                    label="Search First Day"
                    value={this.state.startOfDays}
                    onChange={ e => this.setState({startOfDays: e}) }
                    renderInput={(params) => <TextField {...params} error={false} />}
                />
                <Button type="submit" className="submit" onClick={() => { this.searchDate()}}>
                    Search
                </Button>
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

export default History;