import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Carousels,Head,HomePage } from './homePage'
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Head />
        <Carousels /> */}
        <HomePage />
        
      </div>
    );
  }
}

export default App;
