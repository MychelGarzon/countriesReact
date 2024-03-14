import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import logo from "../assets/earth.png";

// The Register component is a form that allows the user to register for the application.
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter your name");
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/countries");
    }, [user, loading]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', zIndex: 1 }}>
            <Form style={{ backgroundColor: "whitesmoke", textAlign: "center", width: "20rem", padding: "2rem", borderRadius: "10px" }}>
                <img
                    className="img-thumbnail mx-auto d-block mb-2"
                    style={{ width: "5rem", height: "5rem" }}

                    src={logo}
                    alt="logo"
                />
                <Form.Group className="mb-3">
                    <Form.Label><h3>Name</h3></Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label><h3>Email</h3></Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label><h3>Password</h3></Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button onClick={register}>Register</Button>
            </Form>

            <video autoPlay style={{ width: '100%', maxWidth: '100vw', position: 'absolute', zIndex: -2 }}>
                <source src="/earthVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

        </div>
    );
};

export default Register;
