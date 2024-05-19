import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./Login";

const PrivateWrap = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Login />;
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(PrivateWrap);
