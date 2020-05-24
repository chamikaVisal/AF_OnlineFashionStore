import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//css
import "./Profile.css";

//form sections
import AddProductForm from "./AddProductForm";
import AddDiscountForm from "./AddDiscountForm";

//Get the state from redux store.
const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  };
};

// This component shows the items user checked out from the cart.
class ConnectedProfile extends Component {

  render() {

    return (
        <div style={{ padding: 10 }}>
          <div style={{ fontSize: 24, marginTop: 10 }}>
            Profile
          </div>
          <div style={{ marginLeft: 40,}}>
            <AddProductForm />
            <AddDiscountForm />
          </div>

        </div>
    );
  }
}
const Profile = withRouter(connect(mapStateToProps)(ConnectedProfile));

export default Profile;
