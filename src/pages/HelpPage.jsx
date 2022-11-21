import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AffineHelp from "../components/AffineHelp";
import ColorSchemeHelp from "../components/ColorSchemeHelp";
import FractalHelp from "../components/FractalHelp";

const HelpPage = () => {

    const [fractal, setFractal] = useState(false);
    const [colorscheme, setColorScheme] = useState(false);
    const [transformation, setTransformation] = useState(false);

    useEffect(() => {
        var f, c, t;
        f = document.getElementById("fractalBtn");
        c = document.getElementById("colorBtn");
        t = document.getElementById("transBtn");

        if (transformation === false && colorscheme === false && fractal === false) {
            setFractal(true);
        }

        if (fractal === true) {
            f.disabled = true;
        } else {
            f.disabled = false;
        }

        if (colorscheme === true) {
            c.disabled = true;
        } else {
            c.disabled = false;
        }

        if (transformation === true) {
            t.disabled = true;
        } else {
            t.disabled = false;
        }



    }, [fractal, colorscheme, transformation]);

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
                    <a href="/fractal">
                        <button className="navbtn" id="btn1">Fractal</button>
                    </a>
                    <button className="navbtn">Help</button>
                </div>
            </div>
            <div className="inner">
                <div className="htlp-content">
                    <div className="help-text">
                        {fractal ? <FractalHelp /> : null ||
                            colorscheme ? <ColorSchemeHelp /> : null ||
                                transformation ? <AffineHelp /> : null}
                    </div>
                </div>
                <div className="help-sidebar">
                    <button onClick={() => { setFractal(!fractal); setColorScheme(false); setTransformation(false) }} id="fractalBtn">Fractal</button>
                    <button onClick={() => { setColorScheme(!colorscheme); setFractal(false); setTransformation(false); }} id="colorBtn">Color Scheme</button>
                    <button onClick={() => { setTransformation(!transformation); setFractal(false); setColorScheme(false); }} id="transBtn">Transformation</button>
                </div>
            </div>

        </div>
    );
}

export default HelpPage;