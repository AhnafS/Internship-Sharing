import React from 'react';
import '../styles/WaterCupTracker.css';

const WaterCupTracker = ({ filled }) => {
  const maxFill = 4; // The number of increments to reach 100%
  const internshipsLeft = maxFill - filled; // Calculate the internships left

  const fillPercentage = (filled / maxFill) * 100; // Calculate the fill percentage

  return (
    <div className="cup-container">
      <div className="cup">
        {/* Adjust the style to center the text */}
        <div className="remained" style={{ display: fillPercentage === 100 ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Display the number of internships left */}
          <span>{internshipsLeft} left</span>
        </div>
        {/* The filled part of the cup */}
        <div className="percentage" style={{ height: `${fillPercentage}%` }}></div>
      </div>
    </div>
  );
};

export default WaterCupTracker;
