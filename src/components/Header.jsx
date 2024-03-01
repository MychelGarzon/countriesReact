import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user, error] = useAuthState(auth);

  if (!user) {
    return (
      <Container fluid>
        <Row>
          <Navbar bg="light" variant="light">
            <Container className="justify-content-end">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Link to="/home">
                    <Button variant="contained">Home</Button>
                  </Link>
                  <Link to="/register" >
                    <Button variant="contained">Register</Button>
                  </Link>

                  <Link to="/login">
                    <Button variant="contained">Login</Button>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container fluid>
        <Row>
          <Navbar bg="light" variant="light">
            <Container className="justify-content-end">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Link to="/">
                    <Button variant="contained">Home</Button>
                  </Link>
                  <Link to="/countries">
                    <Button variant="contained">Countries</Button>
                  </Link>
                  <Link to="/favourites">
                    <Button variant="contained">Favourites</Button>
                  </Link>
                  <Button variant="contained" onClick={logout}>Logout</Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </Container>
    );
  }
}

export default Header;
