import React from "react";
import AffineTransformationsCanvas from "../components/AffineTransformationsCanvas";
import AffineTransformationsSettings from "../components/AffineTransformationsSettings";

const AffineTransforamtionsPage = () => {

    return (
        <div className="container">
            <div className="navbar">

                <a href="/">
                    <img className="navrefimg" src="../images/tree2.svg" alt="TreeFractal" />
                </a>
                <div className="navbarbuttons">
                    <button className="navbtn">Transformation</button>
                    <a href="/colorscheme">
                        <button className="navbtn">Color Scheme</button>
                    </a>
                    <a href="/fractal">
                        <button className="navbtn" id="btn1">Fractal</button>
                    </a>
                    <a href="/help">
                        <button className="navbtn">Help</button>
                    </a>
                </div>
            </div>
            <div className="inner">
                <div className="canvas-container">
                    <AffineTransformationsCanvas></AffineTransformationsCanvas>
                </div>
                <div className="colorscheme-settings">
                    <p className="settingsAffine-title">Settings</p>
                    <AffineTransformationsSettings></AffineTransformationsSettings>
                </div>
            </div>
        </div>
    );
};

export default AffineTransforamtionsPage;