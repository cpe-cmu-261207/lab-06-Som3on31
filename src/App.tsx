import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About'
import Current from './components/Current'
import History from './components/History'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <div>
      <Router>
        <Navbar />


        <Switch>
          <Route exact path='/'>
            {/* template for /current */}

            <Current />
          </Route>
          <Route path='/current'>
            <Current />
          </Route>
          <Route path='/history/select'>
            {/* template for /history/select */}
            <History />


            {/* template for /history/result */}
          </Route>
          <Route path='/about'>
            <About />
          </Route>
        </Switch>

      </Router>
    </div>

  );
}

export default App;
