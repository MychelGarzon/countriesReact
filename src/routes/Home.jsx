import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";  // Import useNavigate instead of Navigate

const Home = () => {
  const navigate = useNavigate();  // Use useNavigate to get the navigate function

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', zIndex: 1 }}>
        <Button variant="primary" onClick={() => navigate("/Login")}>
          Login
        </Button>
        <Button variant="primary" onClick={() => navigate("/Register")}>
          Register
        </Button>
      </div>
      <video autoPlay loop style={{ width: '100%', maxWidth: '100vw', position: 'absolute', zIndex: 0 }}>
        <source src="/earthVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
export default Home;