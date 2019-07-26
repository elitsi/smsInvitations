import React from 'react';
import './App.css';
import { ArrivalsComponent, WeddingDetails } from './components'

function App() {
  return (
    <div className="App">
      <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" />
      <script src="https://unpkg.com/react/umd/react.production.js" crossOrigin="anonymous" />
      <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css?family=Kalam&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css?family=Assistant&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      
      <WeddingDetails></WeddingDetails>
      <ArrivalsComponent></ArrivalsComponent>
    </div>
  );
}

export default App;
