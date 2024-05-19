import { connect } from "react-redux";

const ErrorPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "red" }}>Error 404</h1>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ErrorPage);
