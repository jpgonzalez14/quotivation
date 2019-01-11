import React, { Component } from 'react';

//Components imports
import Navbar from './components/layout/Navbar';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <header className="App-header">
          <h1>My React app</h1>
        </header>
      </div>
    );
  }
}

export default App;
