import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import * as tt from '@tomtom-international/web-sdk-maps';


const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;

  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [neighbors, setNeighbors] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapContainer, setMapContainer] = useState(null);


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

  useEffect(() => {
    const fetchDataMap = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${country.name.common}`
        );
        const countryData = response.data[0];

        // Check if mapContainer exists before proceeding
        if (mapContainer) {
          // Initialize the map
          const map = tt.map({
            key: 'AXCunYmAUmnmYu2URYfxFCWhCttAF6or',
            container: mapContainer,
            center: [countryData.latlng[1], countryData.latlng[0]],
            zoom: 3,
          });

          // Update the mapLoaded state once the map is loaded
          map.on('load', () => {
            new tt.Marker().setLngLat([countryData.latlng[1], countryData.latlng[0]]).addTo(map);
            setMapLoaded(true);
          });
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchDataMap();
  }, [country.name.common, mapContainer]);

  useEffect(() => {
    const newMapContainer = document.createElement('div');
    newMapContainer.id = 'map';
    newMapContainer.style.height = '400px';
    newMapContainer.style.width = '100rem';

    setMapContainer(newMapContainer);
  }, []);


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
          <h2 className="display-4"><Image src={country.flags.png} style={{ borderRadius: '50%', width: "5rem", height: "5rem", marginRight: '1rem' }} />{country.name.common}</h2>

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
          <Col>
            <Button variant="primary" onClick={() => navigate("/countries")}>
              Back to Countries
            </Button>
          </Col>
        </Col>
        <Col>
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`}
          />

        </Col>
      </Row>
      <Row>
        {mapLoaded && mapContainer ? (
          <div id="map" ref={(el) => el && el.appendChild(mapContainer)} />
        ) : null}
      </Row>

    </Container>
  );

};


export default CountriesSingle;


