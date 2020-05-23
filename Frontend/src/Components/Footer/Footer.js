import React, { Component } from "react";
// import {NavLink, withRouter} from "react-router-dom";
import "./Footer.css";
import cartImage from "../../Images/logo2.png";

// import {connect} from "react-redux";

class Footer extends Component {
    render() {
        return (
            <div
                style={{
                    boxSizing: "border-box",
                    padding: 10,
                    borderTop: "1px solid lightgray",
                    height: 100,
                    backgroundColor: "#f1f1f1",
                    justifyContent: "space-around",
                    display: "flex"
                }}
            >
                {/*<div style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>*/}

               <div style={{ textAlign: 'left'}}>
                 <div style={{ fontWeight: 'bold', color: 'blue' }}>Online Fashion Store</div>
                 <img
              src={cartImage}
              alt={"Logo"}
              style={{justifyContent:'center',alignItems:'center' }}

            />
               </div>
             <br/>

                 <div style={{ fontWeight: 'bold'}}>Email us : hello@onlinestore.com</div>
                <div style={{ fontWeight: 'bold'}}>Contact us on 077 77 77 777</div>

                {/*</div>*/}

               
            </div>
        );
    }
}
//const Footer = withRouter(connect(mapStateToProps)(Footer));
export default Footer;
