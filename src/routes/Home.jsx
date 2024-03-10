const Home = () => {
  return (
    <div>
      <video autoPlay style={{ width: '100%', maxWidth: '100vw' }}>
        <source src="/earthVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Home;
