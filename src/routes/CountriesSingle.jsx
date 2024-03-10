import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;

  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [neighbors, setNeighbors] = useState([]);

  console.log("country", country);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=602d3bd7e1f235b3cc4bbc00f1e602b8
        `
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      });
  }
    , [country.capital]);
  useEffect(() => {
    const fetchNeighbors = async () => {
      if (country?.borders?.length) {
        try {
          const response = await axios.get(
            `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`
          );
          const countries = response.data;
          setNeighbors(
            countries.map((neighbor) => neighbor.name.common)
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchNeighbors();
  }, [country?.borders]);


  console.log("weather", weather);
  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (

    <Container>
      <Row className="m-5">
        <Col>
          {" "}
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`}
          />
          <Image src={country.flags.png} />

        </Col>
        <Col>
          <h2 className="display-4">{country.name.common}</h2>
          <h3>Capital {country.capital}</h3>
          {!error && weather && (
            <div>
              <p>
                Right now it is <strong>{weather.main.temp}</strong>{" "}
                degrees in {country.capital} and{" "}
                {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
          {neighbors.length > 0 && (
            <div>
              <h3>Bordering Countries</h3>
              <ul>
                {neighbors.map((neighbor) => (
                  <li key={neighbor}>

                    <Link to={`/countries/${neighbor}`}>{neighbor}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate("/countries")}>
            Back to Countries
          </Button>
        </Col>
      </Row>
    </Container>
  );

};

export default CountriesSingle;
