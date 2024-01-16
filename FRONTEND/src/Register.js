import React, { useState } from "react";
import axios from "axios";

const registerUrl = "https://gd76i1th6e.execute-api.us-east-2.amazonaws.com/prod/register";
const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message, setMessgae] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if(username.trim() === ''  || email.trim() === ''  || name.trim() === ''  || password.trim() === ''){
            setMessgae("All fields are required");
            return;
        }

        const requestConfig = {
            headers : {
                'x-api-key': "YRATMDQVJ25PoWtqkcoFK4ypM2DlbX2a7eKoE8DO"
            }

        }

        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password,

        }

        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessgae("Registration Successful");
        }).catch(error => {
            if (error.response.status === 401) {
                setMessgae(error.response.data.message);
            } else {
                setMessgae('sorry.... the backend server is down!. Please try again later');
            }
        })

    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
                email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                password: <input type="text" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <input type="submit" value="Register" />
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )

}

export default Register;