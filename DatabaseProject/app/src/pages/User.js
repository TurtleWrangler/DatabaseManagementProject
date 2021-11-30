import React from 'react';
import '../styles/App.css';
// import '../styles/Timecard.css';
import { Text, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Route } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { format, isMonday, previousMonday } from 'date-fns';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            fullName: '',
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
                field: 'occupation',
                headerName: 'Occupation',
                width: 200,
            },
            {
                field: 'email',
                headerName: 'Email',
                width: 200,
            },
            {
                field: 'address',
                headerName: 'Address',
                width: 200,
            },
            {
                field: 'phoneNumber',
                headerName: 'Phone Number',
                width: 200,
            },
            {
                field: 'dateOfBirth',
                headerName: 'Date Of Birth',
                width: 200
            },
            {
                field: 'dateOfHire',
                headerName: 'Date Of Hire',
                width: 200
            }
        ]

        this.currentRowId = 0;
    }

    componentDidMount = () => {
        axios(
            "http://localhost:5000/employee",
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
                    data.data[i].phoneNumber = data.data[i].phoneNumber[0]+data.data[i].phoneNumber[1]+data.data[i].phoneNumber[2]+"-"+
                                               data.data[i].phoneNumber[3]+data.data[i].phoneNumber[4]+data.data[i].phoneNumber[5]+"-"+
                                               data.data[i].phoneNumber[6]+data.data[i].phoneNumber[7]+data.data[i].phoneNumber[8]+
                                               data.data[i].phoneNumber[9];
                    data.data[i].dateOfBirth = format(new Date(data.data[i].dateOfBirth), "yyyy-MM-dd");
                    data.data[i].dateOfHire = format(new Date(data.data[i].dateOfHire), "yyyy-MM-dd");
                }
                this.setState({rows: data.data});
            }
        );
    }

    deleteUser = () => {
        this.state.fullName = this.state.firstName + " " + this.state.lastName;
        this.currentRowId = 0;
        axios(
            `http://localhost:5000/employee/delete/${this.state.fullName}`,
            {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                    mode: 'no-cors'
                }
            }
        );
        axios(
            "http://localhost:5000/employee",
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
                    data.data[i].phoneNumber = data.data[i].phoneNumber[0]+data.data[i].phoneNumber[1]+data.data[i].phoneNumber[2]+"-"+
                                               data.data[i].phoneNumber[3]+data.data[i].phoneNumber[4]+data.data[i].phoneNumber[5]+"-"+
                                               data.data[i].phoneNumber[6]+data.data[i].phoneNumber[7]+data.data[i].phoneNumber[8]+
                                               data.data[i].phoneNumber[9];
                    data.data[i].dateOfBirth = format(new Date(data.data[i].dateOfBirth), "yyyy-MM-dd");
                    data.data[i].dateOfHire = format(new Date(data.data[i].dateOfHire), "yyyy-MM-dd");
                }
                this.setState({rows: data.data});
            }
        );
    }

    render() {
        return(
            <Route exact path="/user">
                <Typography variant="h2" component="div" gutterBottom className='heading'>
                    Users
                </Typography>
                <div style={{ height: 375, width: '100%' }}>
                    <DataGrid
                        disableColumnFilter
                        rows={this.state.rows}
                        columns={this.columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
                <div><b>Would you like to delete a user?</b></div>
                <TextField
                  id="outlined-firstname-required"
                  label="First Name"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onInput={ e => this.setState({firstName: e.target.value}) }
                />
                <TextField
                  id="outlined-lastname-required"
                  label="Last Name"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onInput={ e => this.setState({lastName: e.target.value}) }
                />
                <br></br>
                <Button type="submit" className="submit" onClick={() => { this.deleteUser()}}>
                  Delete
                </Button>
            </Route>
        );
    }
}

export default User;