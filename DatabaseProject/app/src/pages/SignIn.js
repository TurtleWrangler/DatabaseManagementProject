import React from 'react';
import '../App.css';
import {Box, TextField, Button} from '@mui/material';
// import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        };
    }

    handleLogInSubmit = () => {
        
    }

    render() {
        return(
            <Route exact path="/sign-in">
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={this.handleLogInSubmit}
                >
                    <div>
                        <TextField
                        required
                        id="outlined-required"
                        label="Required Email"
                        placeholder="Email"
                        value={this.state.email}
                        onInput={ e => this.setState({email: e.target.value})}
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="Required Password"
                        placeholder="Password"
                        value={this.state.password}
                        onInput={ e => this.setState({password: e.target.value})}
                        />
                    </div>
                    <Button type="submit">
                        Submit
                    </Button>
                </Box>
            </Route>
        );
    }
}

export default SignIn;