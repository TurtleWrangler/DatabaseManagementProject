import React from 'react';
import '../styles/App.css';
import {Box, TextField, Button, InputLabel, FormControl, InputAdornment, IconButton, OutlinedInput, Typography} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { Route } from "react-router-dom";

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          showPassword: false
        };
    }

    handleLogInSubmit = e => {
        e.preventDefault(); //Call prevent default to avoid reloading page on submit.
        axios(
            "http://localhost:5000/Login",
            {
              method: 'post',
              data: {
                Username: this.state.email,
                Password: this.state.password
              },
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                  mode: 'no-cors'
                }
              }).then((data) => {
                this.props.setToken(data.data.token);
            }
        );
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => {return({showPassword: !prevState.showPassword})});
    }

    render() {
        return(
            <Route exact path={["/","/sign-in"]}>
                <Typography variant="h2" component="div" gutterBottom className='heading'>
                    Welcome Back!
                </Typography>
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
                        label="Email"
                        placeholder="Email"
                        value={this.state.email}
                        onInput={ e => this.setState({email: e.target.value})}
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onInput={e => this.setState({password: e.target.value})}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
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