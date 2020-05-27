import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import {StyledForm} from "./RegisterForm";


function AddStudent() {
    const [newStudent, setNewStudent] = useState({
        name: '',
        email: ''
    })

    const onChangeHandler = e => {
        const { name, value } = e.target;
        setNewStudent({...newStudent, [name]: value})
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        axiosWithAuth()
            .post('/api/students', newStudent)
            .then(res => {
                console.log(res)
                window.location.href = '/student-list'
            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            <StyledForm autocomplete="off" onSubmit={onSubmitHandler} >
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        autocomplete="off"
                        type='text'
                        name='name'
                        required
                        value={newStudent.name}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="name">Email:</label>
                    <input
                        autocomplete="off"
                        type='email'
                        name='email'
                        value={newStudent.email}
                        onChange={onChangeHandler}
                    />
                </div>
                <button>Submit</button>
            </StyledForm>
        </div>
    );
}

export default AddStudent;