import React from 'react';

import Navbar from "./components/Navbar";
import Cards from './Pages/Cards';
import CardDetails from './Pages/CardDetails';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/CardDetails/:Id' element={<CardDetails />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App;