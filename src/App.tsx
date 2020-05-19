import React from 'react';
// import logo from './logo.svg';
import './App.css';
import BeerComponent from '../src/Components/BeerComponent';
function App() {
  return (
    <div className="App">
      <p> Testing web app that lists beers from this API: https://punkapi.com/documentation/v2 </p>
      <BeerComponent url="https://punkapi.com/documentation/v2/beer" />
    </div>
  );
}

export default App;
