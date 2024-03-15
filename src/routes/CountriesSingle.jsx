import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import * as tt from '@tomtom-international/web-sdk-maps';

// The CountriesSingle component is a functional component that uses the useLocation and useNavigate hooks from react-router-dom to access the location and navigate to other routes. It also uses the useState and useEffect hooks from React to manage the component's state and side effects.
const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state?.country;
  const [useCountry, setCountry] = useState({})

  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [neighbors, setNeighbors] = useState([]);

  // The fetchCapitalData function is an asynchronous function that takes a country as a parameter and fetches the weather data for the country's capital using the OpenWeatherMap API. It then sets the weather state with the response data.
  function fetchCapitalData(country) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${import.meta.env.VITE_OPENWATHER_API}`
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
      });
  }
  // The fetchNeighbors function is an asynchronous function that takes a country as a parameter and fetches the neighboring countries using the Rest Countries API. It then sets the neighbors state with the response data.
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
  // The useEffect hook is used to fetch the country data when the component mounts. It uses the location state to fetch the country data if it exists, otherwise it fetches the country data using the Rest Countries API. It then sets the country state with the response data and sets the loading state to false.
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

  // The useEffect hook is used to fetch the neighboring countries and the weather data when the component mounts. It also creates a map using the TomTom Maps SDK and sets the map container's width and height. It then sets the map's center and zoom level, and adds a marker to the map at the country's coordinates.
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
          role="outpout"
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
                {useCountry.capital} is <strong>{weather.main.temp}</strong>{" "}
                °C {" "} with {" "}
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
          <Button variant="primary" onClick={() => navigate("/countries")}>
            Back to Countries
          </Button>
        </Col>
        <Col>
          <Col style={{ textAlign: "center", padding: "1rem" }}>
            <div id="map" ></div>

            <Image
              thumbnail
              src={`https://source.unsplash.com/featured/1600x900?${useCountry.name.common}`}
            />

          </Col>
        </Col>
      </Row>



    </Container>
  );

};

export default CountriesSingle;
