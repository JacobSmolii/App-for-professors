import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css';
import LoginPage from "./components /LoginPage";
import AddStudentComponent from "./components /AddStudentComponent";
import RegisterPage from "./components /RegisterPage";
import StudentList from "./components /StudentList";
import UpdateStudent from "./components /UpdateStudent";
import PrivateRoute from "./components /PrivateRoute";

function App() {

  const logOut = e => {
    e.preventDefault()
    localStorage.removeItem('token');
    window.location.href = '/'
  }


  return (
    <div className="App">
      <Router>

        <div  className="forma_links" style={{textAlign: 'center'}}>
          <ul className="links">

            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/student-add">Add student</Link>
            </li>
            <li>
              <Link to="/student-list">Student List</Link>
            </li>
            <button onClick={logOut}>Log Out</button>

          </ul>

          <Switch>
            <PrivateRoute exact path="/student-add" component={AddStudentComponent} />
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <PrivateRoute exact path="/student-list" component={StudentList}/>
            <PrivateRoute path="/update-student/:id" component={UpdateStudent}/>

            <Route component={LoginPage} />

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
