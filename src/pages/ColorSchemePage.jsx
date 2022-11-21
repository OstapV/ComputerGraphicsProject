import React from "react";
import ColorSchemeCanvas from "../components/ColorSchemeCanvas";
import ColorSchemeSettings from "../components/ColorSchemeSettings";


const ColorSchemePage = () => {

    return (
        <div className="container">
            <div className="navbar">

                <a href="/">
                    <img className="navrefimg" src="../images/tree2.svg" alt="TreeFractal" />
                </a>
                <div className="navbarbuttons">
                    <a href="/affine">
                        <button className="navbtn">Transformation</button>
                    </a>
                    <button className="navbtn">Color Scheme</button>
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
                    <ColorSchemeCanvas></ColorSchemeCanvas>
                </div>

                <div className="colorscheme-settings">
                    <p className="settingsColor-title">Settings</p>
                    <ColorSchemeSettings></ColorSchemeSettings>
                </div>
            </div>


        </div>
    );
};

export default ColorSchemePage;