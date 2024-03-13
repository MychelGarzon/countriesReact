import Login from "./Login";
import Register from "./Register";

const Home = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', zIndex: 1 }}>
        <Register />
        <Login />
      </div>
      <video autoPlay style={{ width: '100%', maxWidth: '100vw', position: 'absolute', zIndex: 0 }}>
        <source src="/earthVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Home;