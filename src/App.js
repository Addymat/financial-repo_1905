// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navopt from './Navopt';
import Dashb from './Dashb';
import Login from './Login';
import Home from './Home';
import { UserProvider } from './UserContext';  // Import UserProvider
import Search from './Search';
import Stocks from './Stocks';
import Settings from './Settings';

function App() {
  return (
    <div className="App d-flex">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/stock" element={<Stocks />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
