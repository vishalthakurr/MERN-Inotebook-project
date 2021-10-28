
import './App.css';
import Navbar from './components/Navbar';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';



function App() {
  return (


    <>

      <Router>
        <Navbar />
        <div className="container">
          <NoteState>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/about">
                <About />
              </Route>

            </Switch>
          </NoteState>
        </div>
      </Router>

    </>
  );
}

export default App;
