import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { getFavouritesFromSource } from "../auth/firebase";
import { initializeCountries } from "../store/countriesSlice";
import { removeFavourite } from "../store/favouritesSlice";
import { Link } from "react-router-dom";

const Favourites = () => {
    const dispatch = useDispatch();

    const favourites = useSelector((state) => state.favourites.favourites);
    let countriesList = useSelector((state) => state.countries.countries);

    if (favourites.length > 0) {
        countriesList = countriesList.filter((country) =>
            favourites.includes(country.name.common)
        );
    } else {
        countriesList = [];
    }

    useEffect(() => {
        dispatch(initializeCountries());
        dispatch(getFavouritesFromSource());
    }, [dispatch]);

    return (
        <Container fluid>
            <Row xs={2} md={3} lg={4} className=" g-3">
                {countriesList.map((country) => (
                    <Col key={country.name.official} className="mt-5">
                        <Card className="h-100">

                            <Link
                                to={`/countries/${country.name.common}`}
                                state={{ country: country }}
                            >
                                <Card.Img
                                    variant="top"
                                    src={country.flags.svg}
                                    className="rounded h-50"
                                    style={{
                                        minHeight: "200px",
                                        maxHeight: "200px",
                                    }}
                                />
                            </Link>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{country.name.common}</Card.Title>
                                <Card.Subtitle className="mb-5 text-muted">
                                    {country.name.official}
                                </Card.Subtitle>
                                <ListGroup
                                    variant="flush"
                                    className="flex-grow-1 justify-content-end"
                                >
                                    <ListGroup.Item>
                                        <i className="bi bi-translate me-2"></i>
                                        {Object.values(country.languages ?? {}).join(", ")}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <i className="bi bi-cash-coin me-2"></i>
                                        {Object.values(country.currencies || {})
                                            .map((currency) => currency.name)
                                            .join(", ")}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {country.population.toLocaleString()}
                                    </ListGroup.Item>
                                    <button
                                        onClick={() => dispatch(removeFavourite(country.name.common))}
                                        className="btn btn-danger mt-2"
                                    >
                                        Remove
                                    </button>


                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Favourites;
