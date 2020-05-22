import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//axios
import axios from 'axios';

//redux
import { connect } from "react-redux";

//const fileUpload = require('fuctbase64');

//Get the state from redux store.
const mapStateToProps = state => {
    return {
        loggedInUser: state.loggedInUser
    };
};

class ConnectedAddProductForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            prodName: '',
            prodDescription: '',
            prodPrice: '',
            prodCategory: '',
            imgUpload: '',
        }
        console.log("This is a new section.");
        console.log(this.props.loggedInUser.roles);
    }

    //create a new Store Manager
    createNewProduct(prodName, prodDescription, prodPrice, prodCategory, accessToken, prodImage) {
        console.log('Data of the request @ API')
        console.log('(1) ' + prodName + ' (2) ' + prodDescription + ' (3) ' + prodPrice + ' (4) ' + prodCategory + ' (5) ' + 'Bearer ' + accessToken + ' (6) ' + 'prodImage ' + prodImage)
        axios.post(
            'http://localhost:8080/manager/addproduct',
            {
                prodName: prodName,
                prodDescription: prodDescription,
                prodPrice: prodPrice,
                prodCategory: prodCategory,
                prodImage: prodImage
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
            .then((response) => {
                console.log('SUCCESS: create a new product');
                console.log(response.data);
                alert("Product added successfully!");
                //window.location.reload(false);
            }, (err) => {
                console.log('ERROR: create a new product');
                console.log(err);
                alert("Product not added successfully!");

            });
    }

    //convert image to base64
    getBase64 = (e) => {
        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            this.setState({
                imgUpload: reader.result
            })
            console.log(this.state.imgUpload)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    render() {

        if (this.props.loggedInUser.roles == "ROLE_STORE_MANAGER") {
            return (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        marginLeft: 30,
                        marginTop: 40,
                        flexDirection: "column"
                    }}
                    className= "addProduct"
                >
                    <span style={{ fontSize: 22, color: "#0d0df6", marginTop: 10, marginBottom: 10, marginLeft: 100 }}>Create a new Product</span>
                    <div
                        style={{
                            width: 150,
                            padding: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            marginBottom: 10,

                        }}
                    >
                        <TextField
                            style={{ width: 200, marginLeft: 250 }}
                            value={this.state.prodName}
                            placeholder="Product Name"
                            onChange={e => {
                                this.setState({ prodName: e.target.value });
                            }}
                        /><br/>
                        <TextField
                            style={{ width: 200, marginLeft: 250 }}
                            value={this.state.prodDescription}
                            placeholder="Description"
                            onChange={e => {
                                this.setState({ prodDescription: e.target.value });
                            }}
                        /><br/>
                        <TextField
                            style={{ width: 200, marginLeft: 250 }}
                            value={this.state.prodPrice}
                            placeholder="Price ($)"
                            onChange={e => {
                                this.setState({ prodPrice: e.target.value });
                            }}
                        /><br/>
                        <TextField
                            style={{ width: 200, marginLeft: 250 }}
                            value={this.state.prodCategory}
                            placeholder="Category Type"
                            onChange={e => {
                                this.setState({ prodCategory: e.target.value });
                            }}
                        />
                        <input
                            type="file"
                            className= "custom_choose"
                            style={{ marginTop: 20, width: 180, marginLeft: 250 }}
                            onChange={
                                e => {
                                    this.setState({
                                        prodImage: e.target.files,
                                    })
                                    /*
                                    console.log('Product Image URL');
                                    console.log(this.state.prodImage);
                                    */

                                },
                                this.getBase64
                            }
                        />
                        <Button
                            style={{ marginTop: 20, width: 150,marginLeft: 250 }}
                            variant="contained"
                            color= "primary"
                            onClick={() => {
                                //this.handleProductImage(this.state.prodImage);
                                /*
                                //form validation
                                if (this.state.firstName.trim().length == 0 || this.state.lastName.trim().length == 0 || this.state.email.trim().length == 0 || this.state.password.trim().length == 0) {
                                    return;
                                };
                                */
                                //initiate signup
                                console.log('At the Add a new product');
                                console.log(this.state.prodName, this.state.prodDescription, this.state.prodPrice, this.state.prodCategory, this.state.prodImage);
                                //this.createNewProduct();
                                this.createNewProduct(this.state.prodName, this.state.prodDescription, this.state.prodPrice, this.state.prodCategory, this.props.loggedInUser.accessToken, this.state.imgUpload)
                            }}
                        >
                            Add Product
                        </Button>
                    </div>
                </div>
            )
        } else {
            return <span />
        }
    }
}

const AddProductForm = connect(mapStateToProps)(ConnectedAddProductForm);

export default AddProductForm;
