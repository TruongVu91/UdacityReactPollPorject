import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateWrap = ({ children, loggedIn }) => {
  const location = useLocation();
  return loggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(PrivateWrap);
