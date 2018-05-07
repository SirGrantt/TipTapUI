import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
        <h1>Welcome to TipTap for Virago</h1>
        <br />
        <p id="jumbo">This app is under construction, learn more about what it will do below</p>
        <Link to="/staff"  id="jumbo" className="btn btn-primary">Learn More</Link>
    </div>
  );
};

export default HomePage;
