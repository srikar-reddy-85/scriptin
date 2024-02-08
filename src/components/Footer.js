import React from "react";
import "./Footer.css";
// import PrivacyModal from "../ModalView/PrivacyModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiYoutube, CiFacebook, CiTwitter, } from "react-icons/ci";
import { FaCopyright } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="item1">
                </div>

                <div className="item2">
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    <FaCopyright />{" "}
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} SCRIPTIN. All Rights
                        Reserved.
                    </span>
                </div>
                <a
                    href="https://x.com/"
                    target="_blank"
                    className="item3"
                >
                    <CiTwitter color="white" />
                </a>
                <a
                    href="http://fb.com/"
                    target="_blank"
                    className="item4"
                >
                    <CiFacebook color="white" />
                </a>
                <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    className="item5"
                >
                    <CiYoutube color="white" />
                </a>

            </div>
        </footer>
    );
};

export default Footer;