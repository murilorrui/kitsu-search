import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.sass';
import List from './views/list/list';


function App() {
  return (
    <Router>
      <div className="container">
        <div className="row app-title">
          <h1>Kitsu Search</h1>
        </div>
        <Route exact path="/" component={List}/>
      </div>
    </Router>
  );
}

export default App;
