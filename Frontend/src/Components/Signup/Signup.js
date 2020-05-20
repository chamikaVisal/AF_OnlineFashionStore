import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Card from "@material-ui/core/es/Card/Card";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import login_image from "../../Images/login_cover.jpg"

//Axios
import axios from 'axios';

class ConnectedSignup extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        redirectToReferrer: false
    };

    async getUserSignedIn() {
        axios.post('http://localhost:8080/auth/signup', { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password }, { 'Content-Type': 'application/json' })
            .then((response) => {
                console.log("Success Signup");
                console.log(response.data);
                this.props.history.push("/login");
            }, (err) => {
                console.log("Failed Signup")
                console.log(err);
                this.setState(() => ({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: ''
                }));
                return;
            });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        const cardStyle={
            width: 400,
            height: 450,
            marginLeft: 450,
            marginTop: 100,
        }

        const FirstName={
            width: 300,
        }

        const LastName={
            width: 300,
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
                        {/*<CardMedia style={cover}>*/}
                        {/*    <img src={login_image} style={photo}/>*/}
                        {/*</CardMedia>*/}
            <div style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",

                alignItems: "center",
            }}>
                <div
                    style={{
                        height: 380,
                        width: 200,
                        padding: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Avatar style={{ marginBottom: 10, backgroundColor:'blue' }}>
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
                        Signup
                        {" "}
                    </div>
                    <TextField
                        style={FirstName}
                        id="outlined-basic"
                        label="Enter your first name here"
                        variant="outlined"
                        value={this.state.firstName}
                        placeholder="First Name"
                        onChange={e => {
                            this.setState({ firstName: e.target.value });
                        }}
                    />
                    <br/>
                    <TextField
                        style={LastName}
                        id="outlined-basic"
                        label="Enter your last name here"
                        variant="outlined"
                        value={this.state.lastName}
                        placeholder="Last Name"
                        onChange={e => {
                            this.setState({ lastName: e.target.value });
                        }}
                    />
                    <br/>
                    <TextField
                        style={emailText}
                        id="outlined-basic"
                        label="Enter your email address here"
                        variant="outlined"
                        value={this.state.email}
                        placeholder="Email"
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
                        type="Password"
                        placeholder="Password"
                        onChange={e => {
                            this.setState({ password: e.target.value });
                        }}
                    />
                    <Button
                        style={{ marginTop: 20, width: 200 }}
                        variant = "contained"
                        color="primary"
                        onClick={() => {
                            //form validation
                            if (this.state.password.trim().length == 0 || this.state.email.trim().length == 0) {
                                return;
                            };
                            //initiate signup
                            console.log('At the Form');
                            console.log(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
                            this.getUserSignedIn();

                        }}
                    >
                        Signup
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
const Signup = withRouter(connect()(ConnectedSignup));

export default Signup;
