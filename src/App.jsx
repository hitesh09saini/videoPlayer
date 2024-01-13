import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddVideo from './components/AddVideo';
import Layout from './components/Layout';
import SeeVideo from './components/SeeVideo'

const App = () => {
  return (
    <div>
   
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Layout />}
          />
          <Route
            path='/AddVideo'
            element={<AddVideo />}
          />
          <Route
            path='/seevideos/:id/:subtitle_id'
            element={<SeeVideo />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
