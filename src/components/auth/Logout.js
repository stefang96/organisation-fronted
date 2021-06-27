import React, { useEffect } from "react";
import { logout } from "../../actions/index";
import { connect } from "react-redux";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    // eslint-disable-next-line
  }, []);
  return <div></div>;
};

export default connect(null, { logout })(Logout);
