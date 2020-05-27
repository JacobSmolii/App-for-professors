import React,{useState} from "react";
import {Link} from 'react-router-dom'
import {axiosWithAuth} from "../utils/axiosWithAuth";
import axios from 'axios'
import {StyledForm} from "./RegisterForm";
import {Redirect, useHistory} from "react-router";

const LoginForm = (props) => {
    const [input,setInput] = useState({
        email:'',
        password:''
    })

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const switchRoute = () => {
        return  <Redirect to="/student-list" />
    }

    const login = (event) => {

        event.preventDefault();

        // const { push } = useHistory();

        axios
            .post('https://betterprofessorapp.herokuapp.com/api/auth/login',input)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('name', res.data.name);
                console.log(props.history);
                window.location.href = '/student-list'
                switchRoute();

                // props.history.push('/student-list');
                // useHistory.push('student-list');


            })
            // .catch(err => console.log(err) ? alert("Success") : alert("Check Input"))
            .catch(err => console.log(err))

    }

    return(
        <div>

            <StyledForm onSubmit={login}>
                <label htmlFor="name">Email:</label>
                <input
                    type= 'text'
                    autocomplete="nope"
                    value={input.email}
                    name='email'
                    placeholder='...enter username'
                    onChange={handleChange}
                />
                <label htmlFor="name">Password</label>
                <input
                    autocomplete="new-password"
                    type='password'
                    value={input.password}
                    name='password'
                    placeholder='...enter password'
                    onChange={handleChange}
                />
                <button className="login-button">LOG IN</button>

                <div className="create-acct">
                    <Link className="acct-link" to="/register">Create an Account</Link>
                </div>
            </StyledForm>
        </div>
    )
}

export default LoginForm