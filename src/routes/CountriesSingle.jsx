import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import * as tt from '@tomtom-international/web-sdk-maps';


const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state?.country;
  const [useCountry, setCountry] = useState({})

  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [neighbors, setNeighbors] = useState([]);

  function fetchCapitalData(country) {
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
      });
  }

  const fetchNeighbors = async (country) => {
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

  useEffect(() => {
    const fetchDataMap = async () => {
      try {
        let response
        if (!country) {
          response = await axios.get(
            `https://restcountries.com/v3.1/name/${location.state.countryName}`
          );
        }
        setCountry(country || response.data[0])
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchDataMap();
  }, [location.state]);

  useEffect(() => {
    if (!loading) {
      fetchNeighbors(useCountry);
      fetchCapitalData(useCountry);

      const mapContainer = document.getElementById('map');

      if (mapContainer) {
        mapContainer.style.width = '100%';
        mapContainer.style.height = '400px';

        let map = tt.map({
          key: import.meta.env.VITE_TOMTOM_API,
          container: mapContainer,
          center: [useCountry.latlng[1], useCountry.latlng[0]],
          zoom: 3,
        });

        map.on('load', () => {
          new tt.Marker().setLngLat([useCountry.latlng[1], useCountry.latlng[0]]).addTo(map);
        });
      } else {
        console.error("Map container not found");
        return;
      }
    }
  }, [loading, useCountry]);


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
          <h2 className="display-4"><Image src={useCountry.flags.png} style={{ borderRadius: '50%', width: "5rem", height: "5rem", marginRight: '1rem' }} />{useCountry.name.common}</h2>

          <h3>Capital {useCountry.capital}</h3>
          {!error && weather && (
            <div>
              <p>
                Right now it is <strong>{weather.main.temp}</strong>{" "}
                degrees in {useCountry.capital} and{" "}
                {weather.weather[0].description}
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}

                />
              </p>

            </div>
          )}
          {neighbors.length > 0 && (
            <div>
              <h3>Bordering Countries</h3>
              <p style={{ fontStyle: 'italic' }}>Click on the countrys name to see more information</p>
              <ListGroup >
                {neighbors.map((neighbor) => (
                  <ListGroup key={neighbor}>
                    <Link to={`/countries/${neighbor}`} state={{ countryName: neighbor }} style={{ color: "black", textDecoration: 'none' }}
                    >{neighbor}</Link>
                  </ListGroup>
                ))}
              </ListGroup>
            </div>
          )}

        </Col>
        <Col>
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${useCountry.name.common}`}
          />
          <Col style={{ textAlign: "center", padding: "1rem" }}>

            <Button variant="primary" onClick={() => navigate("/countries")}>
              Back to Countries
            </Button>
          </Col>
        </Col>
      </Row>

      <div id="map" ></div>

    </Container>
  );

};

export default CountriesSingle;
