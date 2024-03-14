import { useNavigate } from "react-router-dom";
import logo from "../assets/earth.png";
import { Button, Form } from "react-bootstrap";

// The Home component is the landing page of the application.
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', zIndex: 1 }}>

        <Form style={{ backgroundColor: "whitesmoke", textAlign: "center", width: "20rem", padding: "2rem", borderRadius: "10px" }}>
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            style={{ width: "5rem", height: "5rem" }}

            src={logo}
            alt="logo"
          />
          <Form.Group className="mb-3" >
            <h3>Login</h3>
            <Button variant="primary" onClick={() => navigate("/Login")}>
              Login
            </Button>
          </Form.Group>

          <Form.Group className="mb-3" ><h3>Register</h3>
            <Button variant="primary" onClick={() => navigate("/Register")}>
              Register
            </Button>
          </Form.Group>

        </Form>

      </div>
      <video autoPlay style={{ width: '100%', maxWidth: '100vw', position: 'absolute', zIndex: 0 }}>
        <source src="/earthVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div >
  );
};

export default Home;