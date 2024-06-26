import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { Col, Spinner } from "react-bootstrap";

// The ProtectedRoute component is a wrapper around the Route component from react-router-dom.
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Col className="text-center m-5">
            <Spinner animation="border" role="outpout" className="center" variant="info">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Col>;
    }

    return user ?
        <Component {...rest} /> :

        <Navigate to="/login" replace />;
};

import PropTypes from 'prop-types';

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};


export default ProtectedRoute;
