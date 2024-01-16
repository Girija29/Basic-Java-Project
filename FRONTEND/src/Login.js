import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { setUserSession } from "./service/AuthService";
import axios from "axios";

const loginAPIUrl = "https://gd76i1th6e.execute-api.us-east-2.amazonaws.com/prod/login";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Both username and password are required');
            return;
        }
        setErrorMessage(null);

        const requestConfig = {
            headers: {
                'x-api-key': "YRATMDQVJ25PoWtqkcoFK4ypM2DlbX2a7eKoE8DO"
            }
        }

        const requestBody = {
            username: username,
            password: password,
        }

        axios.post(loginAPIUrl, requestBody, requestConfig).then((response) => {
            setUserSession(response.data.user, response.data.token);
            navigate('/premium-content'); 
        }).catch((error) => {
            console.error(error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Sorry, the backend server is down!. Please try again later.');
            }
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Login</h5>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br />
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br />
                <input type="submit" value="Login" />
            </form>
            {errorMessage && <p className="message">{errorMessage}</p>}
        </div>
    )
}

export default Login;
