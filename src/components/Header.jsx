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

const Header = () => {
  const [user, error] = useAuthState(auth);

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

  console.log("user", user);

  if (!user) {
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
                  <Button variant="primary" onClick={logout}>Logout</Button>

                  <Navbar.Text>{name}</Navbar.Text>


                </Nav>

              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </Container >
    );
  }
}

export default Header;
