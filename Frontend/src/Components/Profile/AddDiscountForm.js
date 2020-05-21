import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//axios
import axios from 'axios';

//redux
import { connect } from "react-redux";

//Get the state from redux store.
const mapStateToProps = state => {
    return {
        loggedInUser: state.loggedInUser
    };
};
//discount form
class ConnectedAddDiscountForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productId: '',
            discountName: '',
            discountValue: ''
        }
        console.log("This is a new section.");
        console.log(this.props.loggedInUser.roles);
    }

    //create a new Store Manager
    addDiscount(productId, discountName, discountValue, accessToken) {
        console.log('Data of the request @Discount')
        console.log('(1) ' + productId + ' (2) ' + discountName + ' (3) ' + discountValue + ' (4) ' + accessToken)
        axios.post(
            'http://localhost:8080/manager/adddiscount',
            {
                productId: productId,
                discountName: discountName,
                discountValue: discountValue,
                accessToken: accessToken
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
            .then((response) => {
                console.log('SUCCESS: Discount');
                console.log(response.data);
                this.setState({
                    productId: '',
                    discountName: '',
                    discountValue: ''
                });
            }, (err) => {
                console.log('ERROR: Discount');
                console.log(err);
            });
    }

    render() {

        if (this.props.loggedInUser.roles == "ROLE_STORE_MANAGER") {
            return (

                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        marginLeft: 550,
                        marginTop:-330,
                        flexDirection: "column"
                    }}
                    className= "addProduct"

                >
                    <span style={{ fontSize: 22, color: "#0d0df6", marginTop: 10, marginBottom: 10,marginLeft: 80 }}>Add Discount for a product</span>
                    <div
                        style={{
                            width: 150,
                            padding: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            marginBottom: 10
                        }}
                    >
                        <TextField
                            style={{ width: 200, marginLeft: 250 }}
                            value={this.state.productId}
                            placeholder="Product Id"
                            onChange={e => {
                                this.setState({ productId: e.target.value });
                            }}
                        /><br/>
                        <TextField
                            style={{ width: 200, marginLeft: 250 }}
                            value={this.state.discountName}
                            placeholder="Discount Description"
                            onChange={e => {
                                this.setState({ discountName: e.target.value });
                            }}
                        /><br/>
                        <TextField
                            style={{ width: 200, marginLeft: 250 }}
                            value={this.state.discountValue}
                            placeholder="Discount Percentage (%)"
                            onChange={e => {
                                this.setState({ discountValue: e.target.value });
                            }}
                        />
                        <Button
                            style={{ marginTop: 20, width: 150,marginLeft: 250 }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                //form validation
                                if (this.state.productId.trim().length == 0 || this.state.discountName.trim().length == 0 || this.state.discountValue.trim().length == 0) {
                                    alert("Discount not added successfully!");
                                    return;

                                };
                                //initiate signup
                                console.log('Add a new DISCOUNT');
                                alert("Discount added successfully!");
                                console.log(this.state.productId, this.state.discountName, this.state.discountValue);
                                this.addDiscount(this.state.productId, this.state.discountName, this.state.discountValue, this.props.loggedInUser.accessToken)
                            }}
                        >
                            Add Discount
                        </Button>
                    </div>
                </div>
            )
        } else {
            return <span />
        }
    }
}

const AddDiscountForm = connect(mapStateToProps)(ConnectedAddDiscountForm);

export default AddDiscountForm;
