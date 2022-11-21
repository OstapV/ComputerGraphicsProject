import Color from 'color';
import React, {useEffect, useRef, useState } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap';


const ColorSchemeCanvas = () => {

    const[x, setX] = useState(0);
    const[y, setY] = useState(0);
    const[rgb, setRGB] = useState();
    const[cmyk, setCMYK] = useState();
    const[hsv, setHSV] = useState();

    const ref = useRef(null);

    const popoverTop = (
        <Popover id="popover-positioned-top-trigger-hover-focus" title="Popover top" positionLeft={x}>
          <p style={{fontSize: 10}}> x: {x} y: {y} {hsv} {rgb} {cmyk}</p>
        </Popover>
      );

    function getInfoPixel(event)
    {
        const cvs = document.getElementById("colorCanvas");
        const ctx = cvs.getContext("2d");
        var data = ctx.getImageData(x, y, 1, 1);

        const color = new Color({ r: data.data[0], g: data.data[1], b: data.data[2] });
        var newColor = color.cmyk();
        setCMYK(`cmyk(${round(newColor.cyan())}, ${round(newColor.magenta())}, ${round(newColor.yellow())}, ${round(newColor.black())})`);
        newColor = color.hsv();
        setHSV(`hsv(${round(newColor.hue())}, ${round(newColor.saturationv())}, ${round(newColor.value())})`);
        newColor = color.rgb();
        setRGB(newColor.toString());
        setX(event.clientX);
        setY(event.clientY);
    }

    function round(num) {
        return Math.round(num * 100) / 100;
    }

    return (<OverlayTrigger trigger="click" overlay={popoverTop} > 
                <canvas id="colorCanvas" onMouseDown={(e) => {getInfoPixel(e)}}>
                </canvas>
                </OverlayTrigger>);
};

export default ColorSchemeCanvas;