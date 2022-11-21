import React from "react";
import "../styles/App.css";


const HomePage = () => {


    return (
        <div className="container">
            <div className="homepage-content">
                <div className="upper"></div>
                <div className="middlehomepage">
                    <div className="homeimagecontainer">
                        <img src="./images/tree2.svg" alt="TreeFractal" />
                    </div>
                    <div className="buttons-area">
                        <a href="/fractal">
                            <button className="homepagebtn">
                                <img src="./images/hexagram.png" alt="Fractal" />
                                <p>Fractal</p>
                            </button>
                        </a>
                        <a href="/colorscheme">
                            <button className="homepagebtn">
                                <img src="./images/palette.png" alt="ColorPalette" />
                                <p>Color Scheme</p>
                            </button>
                        </a>
                        <a href="/affine">
                            <button className="homepagebtn">
                                <img src="./images/triangle.png" alt="Triangle" />
                                <p>Transformation</p>
                            </button>
                        </a>
                        <a href="/help">
                            <button className="homepagebtn">
                                <img src="./images/help.png" alt="Help" />
                                <p>Help</p>
                            </button>
                        </a>
                    </div>
                </div>
                <div className="footer"></div>
            </div>
        </div>
    );
};

export default HomePage;