import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { Col, Spinner } from "react-bootstrap";

const ProtectedRoute = ({ component: Component }) => {
    const [user, loading, error] = useAuthState(auth);
    console.log("user: ", user);

    if (loading) {
        return <Col className="text-center m-5">
            <Spinner animation="border" role="status" className="center" variant="info">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Col>;
    }

    return user ?
        <Component /> :

        <Navigate to="/login" replace />;
};



export default ProtectedRoute;
