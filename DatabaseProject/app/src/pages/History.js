import React from 'react';
import '../styles/App.css';
// import '../styles/Timecard.css';
import { TextField, Button, Typography, MenuItem, Select, InputLabel, Box, FormControl } from '@mui/material';
import axios from 'axios';
import { Route } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/lab';
import { format, isMonday, previousMonday } from 'date-fns';

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            field: '',
            currentOptions: '',
            queryValue: '',
            operation: ''
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

    searchDate = (e) => {
        e.preventDefault();
        this.currentRowId = 0;
        axios(
            "http://localhost:5000/hours/search",
            {
                method: 'PUT',
                data: {
                    value: this.state.queryValue, 
                    operation: this.state.operation, 
                    field: this.state.field
                },
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

    handleSelectChange = (e) => {
        this.setState({field:e.target.value});
        var options;
        switch(e.target.value){
            case "FirstName":
            case "LastName":
                options = [
                    {id: "Eq", name:"Is Equal To"},
                    {id: "nEq", name:"Is Not Equal To"}
                ]
            break;
            case "Date":
            case "WeekStart":
                options = [
                    {id: "Eq", name:"Is Equal To"},
                    {id: "nEq", name:"Is Not Equal To"},
                    {id: "before", name:"Is Before"},
                    {id: "after", name:"Is After"}
                ]
            break;
            case "HoursWorked":
                options = [
                    {id: "Eq", name:"Is Equal To"},
                    {id: "nEq", name:"Is Not Equal To"},
                    {id: "less", name:"Is Less Than"},
                    {id: "greater", name:"Is Greater To"}
                ]
            break;
        }
        this.setState({currentOperations: options, queryValue: ''});
    }

    render() {
        return(
            <Route exact path="/history">
                <Typography variant="h2" component="div" gutterBottom className='heading'>
                    History
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.searchDate}
                >
                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id="select-field-label">Field</InputLabel>
                        <Select labelId="select-field-label" label="Field" onChange={(e) => this.handleSelectChange(e)}>
                            <MenuItem value="FirstName">First Name</MenuItem>
                            <MenuItem value="LastName">Last Name</MenuItem>
                            <MenuItem value="Date">Date</MenuItem>
                            <MenuItem value="HoursWorked">Hours Worked</MenuItem>
                            <MenuItem value="WeekStart">Week Start Date</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id="select-operation-label">Operation</InputLabel>
                        <Select labelId="select-operation-label" label="Operation" onChange={(e) => this.setState({operation: e.target.value})}>
                            {this.state.currentOperations && this.state.currentOperations.map((option) => (
                                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {(this.state.field === "Date" || this.state.field === "WeekStart") && <DatePicker
                        label="Date"
                        value={this.state.queryValue}
                        onChange={ e => this.setState({queryValue: format(e, "yyyy-MM-dd")}) }
                        renderInput={(params) => <TextField {...params} error={false} />}
                    />}

                    {!(this.state.field === "Date" || this.state.field === "WeekStart") && <TextField
                            label="Value"
                            placeholder="Value"
                            value={this.state.queryValue}
                            onInput={ e => this.setState({queryValue: e.target.value}) }
                        />}

                    <Button type="submit" className="submit">
                        Search
                    </Button>
                </Box>
                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid
                        disableColumnFilter
                        rows={this.state.rows}
                        columns={this.columns}
                        pageSize={20}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </Route>
        );
    }
}

export default History;