import React, { useState } from "react";
import FractalSettings from "../components/FractalSettings";
import FractalCanvas from "../components/FractalCanvas";
import "../styles/App.css";
import { useLocation } from "react-router-dom";

const TestPlasmaFractalPage = () => {
    // TestPlasmaFractalPage     "#346633"
    const [iterations, setIterations] = useState(10);
    const [build, setBuild] = useState();
    const [color, setColor] = useState("#04FF00");
    const [roughness, setRoughness] = useState(50);
    const [typeOfPlasma, setTypeOfPlasma] = useState("0");
    const [settings, setSettings] = useState("1");

    const [opacity, setOpacity] = useState(1);
    const [brownianColor, setBrownianColor] = useState("#00FF00");
    const [background, setBackground] = useState();
    const [brownianFrames, setBrownianFrames] = useState(10000);
    const [dotsCount, setDotsCount] = useState(25);

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
                    <a href="/colorscheme">
                        <button className="navbtn">Color Scheme</button>
                    </a>
                    <button className="navbtn" id="btn1">Fractal</button>
                    <a href="/help">
                        <button className="navbtn">Help</button>
                    </a>
                </div>
            </div>
            <div className="inner">
                <div className="canvas-container">
                    <FractalCanvas iterations={iterations}
                        build={build}
                        color={color}
                        roughness={roughness}
                        typeOfPlasma={typeOfPlasma}
                        settings={settings}
                        opacity={opacity} brownianColor={brownianColor} brownianFrames={brownianFrames} dotsCount={dotsCount}>
                    </FractalCanvas>
                </div>
                <div className="fractal-settings">
                    <p className="settings-title">Settings</p>
                    <FractalSettings iterations={iterations} changeIterations={setIterations}
                        build={build} buildFractal={setBuild}
                        color={color} changeColor={setColor}
                        roughness={roughness} changeRoughness={setRoughness}
                        typeOfPlasma={typeOfPlasma} changeTypeOfPlasma={setTypeOfPlasma}
                        settings={settings} changeSettings={setSettings}
                        opacity={opacity} changeOpacity={setOpacity}
                        brownianColor={brownianColor} changeBrownianColor={setBrownianColor}
                        brownianFrames={brownianFrames} changeBrownianFrames={setBrownianFrames}
                        dotsCount={dotsCount} changeDotsCount={setDotsCount}>
                    </FractalSettings>
                </div>
            </div>
        </div>
    );




};

export default TestPlasmaFractalPage;