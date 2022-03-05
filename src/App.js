
import './App.css';
import Navbar from './components/Navbar';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

import { useState } from 'react';


function App() {

  const [alert, setalert] = useState(null)
  const showalert = (meassage, type) => {

    setalert({
      msg: meassage,
      type: type
    })

    setTimeout(() => {
      setalert(null);
    }, 2000);

  }
  return (


    <>

      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <NoteState>
            <Switch>
              <Route exact path="/">
                <Home showalert={showalert} />
              </Route>

              <Route exact path="/about">
                <About />
              </Route>

              <Route exact path="/login">
                <Login showalert={showalert} />
              </Route>

              <Route exact path="/signup">
                <Signup showalert={showalert} />
              </Route>

            </Switch>
          </NoteState>
        </div>
      </Router>

    </>
  );
}

export default App;
