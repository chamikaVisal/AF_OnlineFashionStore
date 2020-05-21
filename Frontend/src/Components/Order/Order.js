import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setCheckedOutItems } from "../../Redux/Actions";
import TextField from "@material-ui/core/TextField";
import { showAlertDialog} from "../../Redux/Actions";
//axios
import axios from 'axios';
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import Card from "@material-ui/core/es/Card/Card";
import LocalMallIcon from '@material-ui/icons/LocalMall';

//Get the state from redux store.
const mapStateToProps = state => {
    return {
        checkedOutItems: state.cartItems,
        loggedInUser: state.loggedInUser
    };
};

// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            city: '',
            zip: '',
            phoneNumber: '',
            delivery: '',
            paymentMethod: ''
        }

    }

    reOrderCartItems() {
        console.log('At the Oder.js')
        console.log(this.props.checkedOutItems)
        this.props.checkedOutItems.map((item) => {
            delete item.prodComments
            delete item.prodDescription
            delete item.prodImage
            delete item.prodDiscount
            delete item.averageRating
            delete item.prodName
            delete item.prodPrice
            delete item.prodRating
            delete item.prodName
        })
        console.log('Ordered List')
        console.log(this.props.checkedOutItems)
    }

    makeTheOrder() {
        console.log('At the request')
        console.log(this.props.checkedOutItems)
        axios.post(
            'http://localhost:8080/user/placeorder',
            {
                user_Id: this.props.loggedInUser.id,
                products: this.props.checkedOutItems,
                paymentMethod: this.state.paymentMethod,
                paymentRefID: "1213214",
                deliveryMethod: this.state.delivery
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.loggedInUser.accessToken
                }
            }
        )
            .then((response) => {
                console.log('SUCCESS: order placed');
                console.log(response.data);
                alert("Order placed successfully")
                //window.location.reload(false);
            }, (err) => {
                console.log('ERROR: placing order failed');
                alert("something went wrong!");
                console.log(err);
            });
    }
    render() {
        let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
            return accumulator + item.price * item.quantity;
        }, 0);

        const cardStyle={
            width: 400,
            height: 550,
            marginLeft: 450,
            marginTop: 100,
        }

        const textfield={
            width: 300,
        }

        const textfieldrest={
            width: 300,
            marginTop: 2
        }

        return (
            <Card style={cardStyle}>
                <CardActionArea>
                    <div>
                        <div style={{
                            marginTop: 20,
                            fontSize: 24,
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",

                            alignItems: "center",
                        }}>
                            <LocalMallIcon></LocalMallIcon>

                            Order Information
                        </div>

                        <div
                            style={{
                                height: "100%",
                                display: "flex",
                                marginLeft: 50,
                                flexDirection: "column"
                            }}
                        >
                            <div
                                style={{
                                    marginTop: 20,
                                    width: 150,
                                    padding: 10,
                                    paddingLeft: 80,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    marginBottom: 10
                                }}
                            >
                                <TextField
                                    style={textfield}
                                    id="filled-basic"
                                    label="Shipping address"
                                    variant="filled"
                                    value={this.state.address}
                                    onChange={e => {
                                        this.setState({ address: e.target.value });
                                    }}
                                />

                                <TextField
                                    style={textfieldrest}
                                    id="filled-basic"
                                    label="Delivery method"
                                    variant="filled"
                                    value={this.state.delivery}
                                    onChange={e => {
                                        this.setState({ delivery: e.target.value });
                                    }}
                                />
                                <TextField
                                    style={textfieldrest}
                                    id="filled-basic"
                                    label="City"
                                    variant="filled"
                                    value={this.state.city}
                                    onChange={e => {
                                        this.setState({ city: e.target.value });
                                    }}
                                />
                                <TextField
                                    style={textfieldrest}
                                    id="filled-basic"
                                    label="ZIP"
                                    variant="filled"
                                    value={this.state.zip}
                                    onChange={e => {
                                        this.setState({ zip: e.target.value });
                                    }}
                                />
                                <TextField
                                    style={textfieldrest}
                                    id="filled-basic"
                                    label="Phone Number"
                                    variant="filled"
                                    value={this.state.phoneNumber}
                                    onChange={e => {
                                        this.setState({ phoneNumber: e.target.value });
                                    }}
                                />

                                <TextField
                                    style={textfieldrest}
                                    id="filled-basic"
                                    label="Payment method"
                                    variant="filled"
                                    value={this.state.paymentMethod}
                                    onChange={e => {
                                        this.setState({ paymentMethod: e.target.value });
                                    }}
                                />
                            </div>
                        </div>

                        <Button
                            color="primary"
                            variant="contained"
                            disabled={(this.state.delivery == '' || this.state.address == '' || this.state.city == '' || this.state.zip == '' || this.state.phoneNumber == '' || this.state.paymentMethod == '') }
                            onClick={() => {
                                this.reOrderCartItems();
                                console.log("purchased");
                                //this.props.dispatch(showAlertDialog(true));
                                this.setState({
                                    address: '',
                                    city: '',
                                    zip: '',
                                    phoneNumber: '',
                                    delivery: '',
                                    paymentMethod: ''
                                })

                                this.makeTheOrder();
                            }}
                            style={{ margin: 5, marginTop: 30, marginLeft: 90 }}
                        >
                            Purchase
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            //disabled={totalPrice === 0}
                            onClick={() => {
                                this.props.dispatch(setCheckedOutItems([]));
                                this.props.history.push("/");
                            }}
                            style={{ margin: 5, marginTop: 30 }}
                        >
                            Discard
                        </Button>
                    </div>
                </CardActionArea>


            </Card>


        );


    }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
