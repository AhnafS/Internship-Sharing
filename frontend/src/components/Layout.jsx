import { React, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.css";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { useAuth } from "../auth";

const Layout = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [sliderValue, setSliderValue] = useState(10);
  const { signOut, user } = useAuth();

//   const copyEmailHandler = async () => {
//     const location = `${window.location.origin}/share/${user.email}`;
//     if ("clipboard" in navigator) {
//       return await navigator.clipboard.writeText(location);
//     } else {
//       return document.execCommand("copy", true, location);
//     }
//   };
const copyEmailHandler = async () => {
    const location = `${window.location.origin}/share/${user.email}`;
    try {
      if ("clipboard" in navigator) {
        await navigator.clipboard.writeText(location);
        alert("Link successfully copied");
      } else {
        const result = document.execCommand("copy", true, location);
        if(result) {
          alert("Link successfully copied");
        } else {
          alert("Failed to copy the link");
        }
      }
    } catch (error) {
      alert("Failed to copy the link");
    }
  };
  

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
            <Link to="/home">Home</Link>
          </li>
          <li>
            <a href="/all-users"> All Users</a>
          </li>
          <li>
            <a href="#" onClick={copyEmailHandler}>
              Share Link
            </a>
          </li>
          <li>
            <a href="/signin" onClick={signOut}>
              Sign out
            </a>
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
      <h5 style={{ bottom: "10px", right: "10px", position: "absolute" }}>
        Ahnaf Shamim, Ahnaf Hamim, Sulaiman Zohair, Arup Bhowmik
      </h5>
    </div>
  );
};

export default Layout;
