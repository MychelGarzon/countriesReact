import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import logo from "../assets/earth.png";

const Header = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setName(doc.data().name);
      });
    };

    if (user) {
      getUserData();
    }
  }, [user]);

  if (!user) {
    return (
      <Container fluid>

        <Row>
          <Navbar
            style={{ backgroundColor: '#123456', color: '#ffffff', padding: '1rem 0' }}
            expand="md"
          >
            <img
              className="img-thumbnail mx-auto d-block mb-2"
              style={{ width: "5rem", height: "5rem", backgroundColor: '#123456', borderColor: '#123456' }}

              src={logo}
              alt="logo"
            />
            <Container className="justify-content-end">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Link to="/">
                    <Button variant="contained" style={{ color: '#ffffff' }}>Home</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained" style={{ color: '#ffffff' }}>Register</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="contained" style={{ color: '#ffffff' }}>Login</Button>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </Container >
    );
  } else {
    return (
      <Container fluid>
        <Row>
          <Navbar
            style={{ backgroundColor: '#123456', color: '#ffffff', padding: '1rem 0' }}
            expand="md"
          >
            <img
              className="img-thumbnail mx-auto d-block mb-2"
              style={{ width: "5rem", height: "5rem", backgroundColor: '#123456', borderColor: '#123456' }}

              src={logo}
              alt="logo"
            />
            <Container className="justify-content-end">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link to="/countries">
                    <Button variant="contained" style={{ color: '#ffffff' }}>
                      Countries
                    </Button>
                  </Link>
                  <Link to="/favourites">
                    <Button variant="contained" style={{ color: '#ffffff' }}>
                      Favourites
                    </Button>
                  </Link>
                </Nav>
                <Nav>
                  <Button variant="primary" onClick={logout}>
                    Logout
                  </Button>
                  <Navbar.Text
                    variant="contained"
                    style={{ color: '#ffffff', marginLeft: '1rem' }}
                  >
                    {`Welcome ${name}`}
                  </Navbar.Text>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </Container>
    );
  }
};

export default Header;
