import { React, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.css";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { useAuth } from "../auth";

const Layout = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [sliderValue, setSliderValue] = useState(10);
  const { signOut } = useAuth();

  return (
    <div>
      <div
        className={`container ${isNavActive ? "show-nav" : ""}`}
        style={isNavActive ? { transform: `rotate(-${sliderValue}deg)` } : null}
      >
        <div className="circle-container">
          <div
            className="circle"
            onClick={() => setIsNavActive(!isNavActive)}
          ></div>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#"> About</a>
          </li>
          <li>
            <a href="#"> Contact</a>
          </li>
          <li>
            <button onClick={signOut}>Sing out</button>
          </li>
        </ul>
        {isNavActive && (
          <Box sx={{ width: 130, paddingLeft: 3 }}>
            <Slider
              value={sliderValue}
              onChange={(e, n) => setSliderValue(n)}
              defaultValue={10}
              aria-label="Default"
              valueLabelDisplay="auto"
              min={10}
            />
          </Box>
        )}
      </nav>
    </div>
  );
};

export default Layout;
