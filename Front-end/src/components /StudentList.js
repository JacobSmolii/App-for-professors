import React, {useState,useEffect} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import '../App.css'

function StudentList(props) {
    const[student,setStudent] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get("/api/students")
            .then(res => {
                console.log(res)
                setStudent(res.data.students)
            })
            .catch(err => console.log(err))
    },[])

    const onClickEditHandler = (item) => {
        window.location.href=`/update-student/${item.id}`
    }

    const onClickDeleteHandler = (ev, item) => {
        ev.preventDefault();

        axiosWithAuth()
            .delete(`/api/students/${item.id}`)
            .then(res => {
              let a =  window.confirm("Do you wanna delete" + " " + item.name)
                if (a === false) return  0;
                else{
                    window.location.href="/student-list"
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            <h1>Student List</h1><br/>
            {student.map(item => {
                return (
                    <div className="student_list">
                        <li>
                           <span>Name:</span> {item.name} 	&nbsp;	&nbsp; <span>Email:</span> {item.email}
                        </li>
                        <button className="edit_delete" onClick={() => onClickEditHandler(item)}>Edit</button>
                        <button  className="edit_delete" onClick={ev => onClickDeleteHandler(ev, item)} >Delete</button>

                    </div>
                );
            })}
        </div>

    )
}

export default StudentList