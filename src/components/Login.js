import { useState } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { handleLogin } from "../actions/authedUser";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Login = ({ dispatch, isLogin, users }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  if (isLogin) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handelSelectChange = (e) => {
    const text = e.target.value;
    const chosenOne = users.find((user) => user.name === text);
    setUserId(chosenOne.id);
    setPassword(chosenOne.password);
  };

  const handleLoginUser = (e) => {
    e.preventDefault();
    dispatch(handleLogin(userId, password));
    setUserId("");
    setPassword("");
    navigate(state?.path || "/");
  };

  return (
    <div>
      <h2 className="h-body" data-testid="loginTitle">
        Login
      </h2>
      <Form onSubmit={handleLoginUser}>
        <Form.Label>Select User</Form.Label>
        <Form.Select
          className="mb-3"
          onChange={handelSelectChange}
          data-testid="userSelect"
        >
          <option>Chose user</option>
          {users.map((user) => {
            return (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            );
          })}
        </Form.Select>
        <Form.Group className="mb-3">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter user ID"
            value={userId}
            disabled
            data-testid="userid"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter password"
            value={password}
            disabled
            data-testid="password"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={userId === "" || password === ""}
          data-testid="loginButton"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  console.log("users test", users);
  return {
    isLogin: !!authedUser,
    users: Object.values(users),
  };
};

export default connect(mapStateToProps)(Login);
