import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardText, Form, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFavouritesFromSource } from "../auth/firebase";
import { initializeCountries } from "../store/countriesSlice";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";

// The Countries component is a list of countries that displays the country's flag, name, official name, languages, currency, and population.
const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

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

  // Filter the countries based on the search input.
  const filteredCountries = countriesList
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .filter((country) =>
      selectedContinent === "All"
        ? true
        : country.region === selectedContinent
    );
  // The continentOptions array contains the options for the continent select input.
  const continentOptions = [
    { value: "All", label: "All countries" },
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "Americas" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];
  // Sort the countries alphabetically by their common name.
  const sortedCountries = filteredCountries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  return (
    <Container fluid>
      <Row className="mb-3 justify-content-center">
        <Form.Control
          style={{ width: "18rem" }}
          type="search"
          className="me-2"
          placeholder="Search for countries"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Form.Select
          style={{ width: "18rem" }}
          placeholder="Search for countries"
          onChange={(e) => setSelectedContinent(e.target.value)}
        >
          {continentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>

      </Row>
      <Row xs={1} md={3} lg={5} className="g-3">
        {sortedCountries.map((country) => (
          <Col key={country.name.common}>
            <Card className="h-100">
              {favourites.some((favourite) => favourite === country.name?.common) ? (
                <FavoriteIcon onClick={() => dispatch(removeFavourite(country.name.common))} />
              ) : (
                <FavoriteBorderIcon onClick={() => dispatch(addFavourite(country.name.common))} />
              )}
              <Link to={`/countries/${country.name.common}`} state={{ country: country }}>
                <Card.Img
                  variant="top"
                  src={country.flags.svg}
                  className="rounded w-100"
                  style={{
                    objectFit: "cover",
                    minHeight: "200px",
                    maxHeight: "200px",
                  }}
                />
              </Link>
              <Card.Body className="d-flex flex-column">
                <CardText style={{ fontStyle: "italic" }}><p>Click flag for info</p></CardText>
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted">
                  {country.name.official}
                </Card.Subtitle>
                <ListGroup variant="flush" className="flex-grow-1 justify-content-end">
                  <ListGroup.Item>
                    <i className="bi bi-translate me-2"></i>
                    {"Languages: " + Object.values(country.languages ?? {}).join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="bi bi-cash-coin me-2"></i>
                    {"Currency: " + Object.values(country.currencies || {})
                      .map((currency) => currency.name)
                      .join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="bi bi-people me-2"></i>
                    {"Population: " + country.population.toLocaleString()}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Countries;