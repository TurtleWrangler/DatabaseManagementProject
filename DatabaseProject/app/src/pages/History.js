import React from 'react';
import '../styles/App.css';
// import '../styles/Timecard.css';
import { Typography } from '@mui/material';
import axios from 'axios';
import { Route } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import SearchBar from "material-ui-search-bar";

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            rows: []
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
        // this.setState(() => {
        //     const today = new Date();
        //     return {startOfWeek: isMonday(today) ? today : new Date(previousMonday(today))};
        // }, this.getSelectedWeekTime);
        // axios(
        //     "http://localhost:5000/hours",
        //     {
        //     method: 'GET',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //         'Authorization': this.props.token,
        //         mode: 'no-cors'
        //         }
        //     }).then((data) => {
        //         data.data.map(row => {
        //             row.id = this.currentRowId;
        //             ++this.currentRowId;
        //             return row;
        //         });
        //         this.setState({rows: data.data});
        //     }
        // );
    }

    searchCriteria = () => {
        // axios(
        //     `http://localhost:5000/hours/${this.state.value}`,
        //     {
        //     method: 'GET',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //         'Authorization': this.props.token,
        //         mode: 'no-cors'
        //         }
        //     }).then((data) => {
        //         data.data.map(row => {
        //             row.id = this.currentRowId;
        //             ++this.currentRowId;
        //             return row;
        //         });
        //         this.setState({rows: data.data});
        //     }
        // );
    }

    render() {
        return(
            <Route exact path="/history">
                <Typography variant="h2" component="div" gutterBottom className='heading'>
                    History
                </Typography>
                <SearchBar
                  value={this.state.value}
                  onChange={(newValue) => this.setState({ value: newValue })}
                //   onRequestSearch={() => this.searchCriteria()}
                />
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