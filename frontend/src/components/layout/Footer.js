import React from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div class="social-links">
        <YouTubeIcon className="icon" style={{ color: "white", fontSize: "25px" }} />
        <TwitterIcon className="icon" style={{ color: "white", fontSize: "25px" }} />
        <FacebookIcon className="icon" style={{ color: "white", fontSize: "25px" }} />
      </div>
      <div class="copyright">©2022 All Rights Reserved.</div>
      <div class="links">
        <a href="" class="link">Contact Us</a>
        <a href="" class="link">Privacy Policies</a>
        <a href="" class="link">Help</a>
      </div>
    </footer>
  );
};

export default Footer;
