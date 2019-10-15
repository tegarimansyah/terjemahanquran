import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from '../App/Navbar';
import HomeScreen from '../Home/home';
import ReadingList from '../QuranList/quranlist';


function App() {
  return (
    <div className="App" >
      <Router>
        <Navbar />
        <Route path="/" exact component={HomeScreen} />
        <Route path="/reading_list" component={ReadingList} />
      </Router>
    </div>
  );
}

export default App;
