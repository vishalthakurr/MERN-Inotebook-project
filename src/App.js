
import './App.css';
import Navbar from './components/Navbar';
import React from "react";
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';


function App() {
  return (
    <>

      <Router>

        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>

          </Switch>

        </div>
      </Router>


    </>
  );
}

export default App;
