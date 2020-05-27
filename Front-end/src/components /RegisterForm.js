import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {axiosWithAuth} from "../utils/axiosWithAuth";


export const StyledForm = styled.form`
width: 50%;
height: 70vh;
margin: auto 300px;
padding: 32px;
font-weight: bold;
color: #223F68;
box-shadow: 0 0 10px 5px lightgray;
display: flex;
flex-direction: column;
justify-content: space-evenly;
border-radius:25px;
 
input {
    margin-bottom: 28px;
    padding: 0.5rem;
    font-size: 16px;
    width: 96%;
    display: block;
    color: white;
    border-radius:3px;
   
}
label {
    display: flex;
    text-align: start;
    justify-content: end;
    
}
button {
  max-width: 100%;
  width: 250px;
  margin: 20px 0;
  padding: 12px 20px;
  border-style: none;
  background-color: #457B9D;
  box-shadow: 0px 2px 2px lightgray;
  font-size: 25px;
  font-weight: 500;
  color: #F8F9F7;
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  display: flex;
  align-self: center;
  text-align:center;
  color:white;
    align-items: center;
    justify-content: center;
}
`;
const RegisterForm = () => {
    // gets data from form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    // stores real time change in the form input
    const changeHandler = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        console.log(event.target.value);
    };

    // sends form data to state via the state function passed down
    const submitForm = event => {
        event.preventDefault();
        // setFormData({ name: "", email: "",password: ""});
        axios.post('https://betterprofessorapp.herokuapp.com/api/auth/register', formData)
            .then(res => {
                window.location.href = '/login'
                console.log(res.data)
            } )
            .catch(err => console.log(err.response));
    }

    return (
        <StyledForm  autocomplete="off" onSubmit={submitForm}>
            <label htmlFor="name">Username</label>
            <input
                autocomplete="off"
                name="name"
                id="name"
                type="text"
                placeholder="Name"
                onChange={changeHandler}
                value={formData.name}
                required />
            <label htmlFor="email">Email</label>
            <input
                autocomplete="off"
                name="email"
                id="email"
                type="text"
                placeholder="Email"
                onChange={changeHandler}
                value={formData.email}
                required/>
            <label htmlFor="password">Password</label>
            <input
                autocomplete="off"
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                onChange={changeHandler}
                value={formData.password}
                required/>
            <button type="submit" >Register</button>
        </StyledForm>
    );
};

export default RegisterForm;