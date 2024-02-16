import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithEmailAndPassword } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
            console.log(user);
            navigate('/countries');
        }
    }, [user, loading, navigate]);

    return (
        <div>
            <h1>Login</h1>
            <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={login}>Login</Button>
        </div>
    )
}

export default Login;