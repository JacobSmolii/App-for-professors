import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import {StyledForm} from "./RegisterForm";

function UpdateStudent(props) {

    const [item, setItem] = useState({
        name: '',
        email: ''
    })

    const {id} = useParams();

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/students/${id}`)
            .then(res => {
                console.log(res.data.student);
                setItem(res.data.student)
            })
            .catch(err => console.log(err))
    }, [])

    const onChangeHandler = e => {
        const {name, value} = e.target;
        setItem({...item, [name]: value});
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        axiosWithAuth()
            .put(`/api/students/${id}`, { name: item.name, email: item.email })
            .then(res => {
                // console.log(res)
                window.location.href="/student-list"
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            <StyledForm  autocomplete="off" onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        autocomplete="off"
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="name">Email:</label>
                    <input
                        autocomplete="off"
                        type="email"
                        name="email"
                        value={item.email}
                        onChange={onChangeHandler}
                    />
                </div>
                <button>Update</button>
            </StyledForm>
        </div>
    );
}

export default UpdateStudent;