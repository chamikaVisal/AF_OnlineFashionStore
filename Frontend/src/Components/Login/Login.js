import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//imports
import axios from 'axios';
import Card from "@material-ui/core/es/Card/Card";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import login_image from "../../Images/cover.jpg"


class ConnectedLogin extends Component {

    state = {
        email: "",
        password: "",
        redirectToReferrer: false,
        isUserLoggedIn: false
    };


    async getUserLoggedIn() {

        const { from } = this.props.location.state || { from: { pathname: "/" } };
        axios.post(
            'http://localhost:8080/auth/login',
            { username: this.state.email, password: this.state.password },
            { 'Content-Type': 'application/json' })
            .then((response) => {
                console.log(response.data);
                this.props.dispatch(setLoggedInUser({
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                    roles: response.data.roles[0],
                    accessToken: response.data.accessToken,
                    tokenType: response.data.tokenType,
                }));
                this.setState(() => ({
                    redirectToReferrer: true
                }));
                this.props.history.push("/");
                return <Redirect to={from} />;
            }, (err) => {
                console.log(err);
                this.setState(() => ({
                    redirectToReferrer: false
                }));
                this.setState(() => ({
                    email: '',
                    password: ''
                }));
                return;
            });
    };

    render() {

        const { from } = this.props.location.state || { from: { pathname: "/" } };

        const cardStyle={
            width: 400,
            height: 400,
            marginLeft: 450,
            marginTop: 100,
        }

        const emailText={
            width: 300,
        }

        const pwText={
            width: 300,
        }

        // If user was authenticated, redirect her to where she came from.
        if (this.state.redirectToReferrer === true) {
            return <Redirect to={from} />;
        }

        return (
            <div style={{backgroundImage:`url(${login_image})`}}>

                <Card style={cardStyle}>
                <CardActionArea>
            <div style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",

                alignItems: "center",
            }}>
                <div
                    style={{
                        height: 300,
                        width: 200,
                        padding: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Avatar

                        style={{ marginBottom: 10, backgroundColor:'blue' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <div
                        style={{
                            marginBottom: 20,
                            fontSize: 24,
                            textAlign: "center"
                        }}
                    >
                        {" "}
                        Log in
                        {" "}
                    </div>
                    <TextField
                        style={emailText}
                        id="outlined-basic"
                        label="Enter your email address here"
                        variant="outlined"
                        value={this.state.email}
                        onChange={e => {
                            this.setState({ email: e.target.value });
                        }}
                    />
                    <br/>
                    <TextField
                        style={pwText}
                        id="outlined-basic"
                        label="Enter your password here"
                        variant="outlined"
                        value={this.state.password}
                        type="password"
                        onChange={e => {
                            this.setState({ password: e.target.value });
                        }}
                    />
                    <br/>
                    <Button
                        variant = "contained"
                        style={{ marginTop: 20, width: 200 }}
                        color="primary"
                        onClick={() => {
                            //validation
                            if (this.state.password.trim().length == 0 || this.state.email.trim().length == 0) {
                                return;
                            };
                            //initiate login request
                            this.getUserLoggedIn()

                        }}
                    >
                        Log in
                    </Button>
                    {this.state.wrongCred && (
                        <div style={{ color: "red" }}>Wrong username and/or password</div>
                    )}
                </div>
            </div>
                </CardActionArea>


            </Card>
            </div>

        );
    }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;
