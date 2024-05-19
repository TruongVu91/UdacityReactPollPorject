import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import { handleLogout } from "../actions/authedUser";
import { Link } from "react-router-dom";

const NavBar = ({ dispatch, authedUser }) => {
  const handleLogoutUser = (e) => {
    e.preventDefault();
    console.log("logout");
    dispatch(handleLogout());
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>{authedUser ? <h2>Employee Poll</h2> : ""}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {authedUser ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/new" data-testid="newNavLink">
                New
              </Nav.Link>
              <Nav.Link as={Link} to="/leader-board">
                LeaderBoard
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          ""
        )}
        <Navbar.Brand>
          {authedUser ? (
            <Image
              className="img-table"
              src={authedUser.avatarURL}
              roundedCircle
            />
          ) : (
            ""
          )}
          {authedUser ? <span className="ms-2">{authedUser.name}</span> : ""}
          {authedUser ? (
            <Button
              className="ms-2"
              variant="secondary"
              size="sm"
              onClick={handleLogoutUser}
            >
              Logout
            </Button>
          ) : (
            ""
          )}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(NavBar);
