import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithEmailAndPassword } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import logo from "../assets/earth.png";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const login = async () => {
        try {
            await loginWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (loading) return;
        if (user) {
            navigate('/countries');
        }
    }, [user, loading, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', zIndex: 1 }}>

            <Form style={{ backgroundColor: "whitesmoke", textAlign: "center", width: "20rem", padding: "2rem", borderRadius: "10px" }}>
                <img
                    className="img-thumbnail mx-auto d-block mb-2"
                    style={{ width: "5rem", height: "5rem" }}

                    src={logo}
                    alt="logo"
                />
                <Form.Group className="mb-3" >
                    <Form.Label><h3>Email</h3></Form.Label>
                    <Form.Control
                        type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label><h3>Password</h3></Form.Label>
                    <Form.Control
                        type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button onClick={login}>Login</Button>
            </Form>

        </div>
    )
}

export default Login;