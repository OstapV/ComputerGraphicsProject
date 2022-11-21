import React, { useCallback, useEffect, useRef, useState } from "react";
import ColorPicker from "./ColorPicker";
import Color from 'color';

const ColorSchemeSettings = () => {

    const [fromType, setFromType] = useState('cmyk');
    const [toType, setToType] = useState();
    const [curColor, setCurColor] = useState();
    const [fromColor, setFromColor] = useState("cmyk(1,1,1,1)");
    const [coef, setCoef] = useState(1);
    const imageRef = useRef(null);

    function saveCanvasImage() {
        const cvs = document.getElementById("colorCanvas");
        const link = document.createElement('a');
        link.download = 'convertedImg.png';
        link.href = cvs.toDataURL();
        link.click();
    }

    function drawImage(context, img) {
        context.canvas.height = context.canvas.clientHeight;
        context.canvas.width = context.canvas.clientWidth;
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, context.canvas.width, context.canvas.height);
    }

    function handleImage(e) {
        var reader = new FileReader();
        const cvs = document.getElementById("colorCanvas");
        const ctx = cvs.getContext("2d");

        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                imageRef.current = img;
                drawImage(ctx, img);
            }
            img.src = event.target.result;
            // img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Posing_Cliff_Berryman.jpg/800px-Posing_Cliff_Berryman.jpg"
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    function returnPhoto() {
        const cvs = document.getElementById("colorCanvas");
        const ctx = cvs.getContext("2d");
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        drawImage(ctx, imageRef.current);
    }


    function hexToRGB(h) {
        let r = 0, g = 0, b = 0;

        // 3 digits
        if (h.length == 4) {
            r = "0x" + h[1] + h[1];
            g = "0x" + h[2] + h[2];
            b = "0x" + h[3] + h[3];

            // 6 digits
        } else if (h.length == 7) {
            r = "0x" + h[1] + h[2];
            g = "0x" + h[3] + h[4];
            b = "0x" + h[5] + h[6];
        }

        return "rgb(" + +Math.round(r) + "," + +Math.round(g) + "," + +Math.round(b) + ")";
        // return [r,g,b];
    }

    function rgbToHex(rgb) {
        var RGB = convertString(rgb);
        return "#" + ((1 << 24) + (Math.round(RGB[0]) << 16) + (Math.round(RGB[1]) << 8) + Math.round(RGB[2])).toString(16).slice(1);
    }

    function convertString(str) {
        var reallyNumbers = str.match(/[\d.]+/g).map(Number);
        return reallyNumbers;
    }

    function rgb2hsv(rgb) {
        var computedH = 0;
        var computedS = 0;
        var computedV = 0;

        //remove spaces from input RGB values, convert to int
        // var r = parseInt(('' + r).replace(/\s/g, ''), 10);
        // var g = parseInt(('' + g).replace(/\s/g, ''), 10);
        // var b = parseInt(('' + b).replace(/\s/g, ''), 10);

        var r, g, b;
        var RGB = convertString(rgb);

        r = RGB[0];
        g = RGB[1];
        b = RGB[2];

        if (r == null || g == null || b == null ||
            isNaN(r) || isNaN(g) || isNaN(b)) {
            alert('Please enter numeric RGB values!');
            return;
        }
        if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
            alert('RGB values must be in the range 0 to 255.');
            return;
        }
        r = r / 255; g = g / 255; b = b / 255;
        var minRGB = Math.min(r, Math.min(g, b));
        var maxRGB = Math.max(r, Math.max(g, b));

        // Black-gray-white
        if (minRGB == maxRGB) {
            computedV = minRGB;
            return [0, 0, computedV];
        }

        // Colors other than black-gray-white:
        var d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
        var h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);
        computedH = 60 * (h - d / (maxRGB - minRGB));
        computedS = (maxRGB - minRGB) / maxRGB;
        computedV = maxRGB;
        return `hsv(${round(computedH)}, ${round(computedS)}, ${round(computedV)})`;
    }

    function round(num) {
        return Math.round(num * 100) / 100;
    }

    function hexToHSV(h) {
        var resRGB = hexToRGB(h);
        // var temprgb = convertString(resRGB);
        var color = new Color(h);
        color.hsv();
        var resHSV = rgbToHsv(resRGB);
        // return "rgb("+ +r + "," + +g + "," + +b + ")";
        // return "hsv("+ +resHSV[0] +"," + +resHSV[1] + "," + +resHSV[2] + ")";

        return `hsv(${round(color.hue())}, ${round(color.saturationv())}, ${round(color.value())})`;
        // return resHSV;
    }

    function hsvToRgb(hsv) {
        
        var res = convertString(hsv);
        var color = new Color({ h: res[0], s: res[1], v: res[2] });
        return color.rgb().toString();
    }

    function rgbToHsv(rgb) {
        var res = convertString(rgb);
        var color = new Color({ r: res[0], g: res[1], b: res[2] });

        return `hsv(${round(color.hue())}, ${round(color.saturationv())}, ${round(color.value())})`;
    }

    function hsv2cmyk(hsv) {
        // var resRGB = hsvToRgb(hsv);
        // var resCMYK = rgb2cmyk(resRGB);
        // return resCMYK;

        var res = convertString(hsv);
        var color = new Color({ h: res[0], s: res[1], v: res[2] });
        color.cmyk();
        return `cmyk(${round(color.cyan())}, ${round(color.magenta())}, ${round(color.yellow())}, ${round(color.black())})`;
    }

    function cmyk2hsv(cmyk) {
        // var resRGB = cmyk2rgb(cmyk);
        // var resHSV = rgb2hsv(resRGB);
        // return resHSV;

        var res = convertString(cmyk);
        var color = new Color({ c: res[0], m: res[1], y: res[2], k: res[3] });
        color.hsv();
        return `hsv(${round(color.hue())}, ${round(color.saturationv())}, ${round(color.value())})`;
    }

    function cmyk2rgb(cmyk) {
        var c, m, y, k;
        var res = convertString(cmyk);
        c = res[0];
        m = res[1];
        y = res[2];
        k = res[3];

        c = (c / 100);
        m = (m / 100);
        y = (y / 100);
        k = (k / 100);

        c = c * (1 - k) + k;
        m = m * (1 - k) + k;
        y = y * (1 - k) + k;

        var r = 1 - c;
        var g = 1 - m;
        var b = 1 - y;


        r = Math.round(255 * r);
        g = Math.round(255 * g);
        b = Math.round(255 * b);


        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    }


    function changeV_ON_BLUE_HSV() {
        const cvs = document.getElementById("colorCanvas");
        const ctx = cvs.getContext("2d");


        if (ctx != null) {
            var data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
            for (let i = 0; i < data.data.length; i += 4) {

                const color = new Color({ r: data.data[i + 0], g: data.data[i + 1], b: data.data[i + 2] });

                if (color.hue() > 180 && color.hue() < 241) {
                    const newColor = color.value(coef);
                    data.data[i + 0] = Math.round(newColor.red());
                    data.data[i + 1] = Math.round(newColor.green());
                    data.data[i + 2] = Math.round(newColor.blue());
                }
                
            }
            ctx.putImageData(data, 0, 0);
        }
    }

    function imgToCMYK() {
        const cvs = document.getElementById("colorCanvas");
        const ctx = cvs.getContext("2d");


        if (ctx != null) {
            var data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
            for (let i = 0; i < data.data.length; i += 4) {

                const color = new Color({ r: data.data[i + 0], g: data.data[i + 1], b: data.data[i + 2] });

                const newColor = color.cmyk();
                data.data[i + 0] = Math.round(newColor.red());
                data.data[i + 1] = Math.round(newColor.green());
                data.data[i + 2] = Math.round(newColor.blue());

            }
            ctx.putImageData(data, 0, 0);
        }
    }

    function imgToHSV() {
        const cvs = document.getElementById("colorCanvas");
        const ctx = cvs.getContext("2d");


        if (ctx != null) {
            var data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
            for (let i = 0; i < data.data.length; i += 4) {

                const color = new Color({ r: data.data[i + 0], g: data.data[i + 1], b: data.data[i + 2] });

                const newColor = color.hsv();
                data.data[i + 0] = Math.round(newColor.red());
                data.data[i + 1] = Math.round(newColor.green());
                data.data[i + 2] = Math.round(newColor.blue());

            }
            ctx.putImageData(data, 0, 0);
        }
    }

    function imgToRGB() {
        const cvs = document.getElementById("colorCanvas");
        const ctx = cvs.getContext("2d");


        if (ctx != null) {
            var data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
            for (let i = 0; i < data.data.length; i += 4) {

                const color = new Color({ r: data.data[i + 0], g: data.data[i + 1], b: data.data[i + 2] });

                const newColor = color.rgb();
                data.data[i + 0] = Math.round(newColor.red());
                data.data[i + 1] = Math.round(newColor.green());
                data.data[i + 2] = Math.round(newColor.blue());

            }
            ctx.putImageData(data, 0, 0);
        }
    }

    function hsvToHex(hsv) {
        var resRGB;
        var resHEX;
        var array = convertString(hsv);

        if (array.length > 3) {
            resHEX = cmykToHex(hsv);
        }
        else {
            resRGB = hsvToRgb(hsv);
            resHEX = rgbToHex(resRGB);
        }

        return resHEX;
    }

    function cmykToHex(cmyk) {
        var resRGB;
        var resHEX;
        var array = convertString(cmyk);
        if (array.length > 3) {
            resRGB = cmyk2rgb(cmyk);
            resHEX = rgbToHex(resRGB);
        }
        else {
            resHEX = rgbToHex(cmyk);
        }

        return resHEX;
    }


    function rgb2cmyk(rgb) {
        var r, g, b;
        var res = convertString(rgb);

        r = res[0];
        g = res[1];
        b = res[2];

        var c = 1 - (r / 255);
        var m = 1 - (g / 255);
        var y = 1 - (b / 255);
        var k = Math.min(c, Math.min(m, y));

        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);

        c = Math.round(c * 10000) / 100;
        m = Math.round(m * 10000) / 100;
        y = Math.round(y * 10000) / 100;
        k = Math.round(k * 10000) / 100;


        c = isNaN(c) ? 0 : c;
        m = isNaN(m) ? 0 : m;
        y = isNaN(y) ? 0 : y;
        k = isNaN(k) ? 0 : k;

        return `cmyk(${round(c)}, ${round(m)}, ${round(y)}, ${round(k)})`;
    }

    function hexToCMYK(hex) {
        var rgb = hexToRGB(hex);
        var res = rgb2cmyk(rgb);
        return res;
    }

    const convert = useCallback(() => {
        switch (fromType) {
            case 'hsv':
                return hexToHSV;
            case 'rgb':
                return hexToRGB;
            case 'cmyk':
                return hexToCMYK;
            default:
                return hexToRGB;
        }
    }, [fromType]);


    useEffect(() => {
        switch (fromType) {
            case 'hsv':
                setFromColor('hsv(0,0,0)');
                break;
            case 'rgb':
                setFromColor('rgb(0,0,0)');
                break;
            case 'cmyk':
                setFromColor('cmyk(0,0,0,100)');
                break;
            default:
                break;
        }
    }, [fromType])

    const reverseConvert = useCallback(() => {
        switch (fromType) {
            case 'hsv':
                return hsvToHex;
            case 'rgb':
                return rgbToHex;
            case 'cmyk':
                return cmykToHex;
            default:
                return rgbToHex;
        }
    }, [fromType]);


    useEffect(() => {

        if (fromType === 'rgb') {
            switch (toType) {
                case 'hsv':
                    setCurColor(rgbToHsv(fromColor));
                    break;
                case 'cmyk':
                    setCurColor(rgb2cmyk(fromColor));
                    break;
                default:
                    break;
            }
        }

        if (fromType === 'hsv') {
            switch (toType) {
                case 'rgb':
                    setCurColor(hsvToRgb(fromColor));
                    break;
                case 'cmyk':
                    setCurColor(hsv2cmyk(fromColor));
                    break;
                default:
                    break;
            }
        }

        if (fromType === 'cmyk') {
            switch (toType) {
                case 'rgb':
                    setCurColor(cmyk2rgb(fromColor));
                    break;
                case 'hsv':
                    setCurColor(cmyk2hsv(fromColor));
                    break;
                default:
                    break;
            }
        }


    }, [fromType, toType, fromColor]);



    return (
        <div className="settings">
            <div className="convertor">
                <div className="changeModelBtns">
                    <button onClick={imgToRGB}>RGB</button>
                    <button onClick={imgToHSV}>HSV</button>
                    <button onClick={imgToCMYK}>CMYK</button>
                </div>
                <p>From:<br /></p>
                <select
                    className="settings-select my-10"
                    value={fromType}
                    onChange={(e) => {
                        setFromType(e.target.value);
                    }}
                >
                    <option value={"rgb"}>RGB</option>
                    <option value={"hsv"}>HSV</option>
                    <option value={"cmyk"}>CMYK</option>
                </select>
                <div className='block-color'>
                    <p className='title-color'>Color:</p>
                    <ColorPicker converter={convert()} reverseConverter={reverseConvert()} handleChange={setFromColor} value={fromColor} />
                </div>
                <p>To:<br /></p>
                <select
                    className="settings-select my-10"
                    value={toType}
                    onChange={(e) => {
                        setToType(e.target.value);
                    }}
                >
                    <option value={"rgb"}>RGB</option>
                    <option value={"hsv"}>HSV</option>
                    <option value={"cmyk"}>CMYK</option>
                </select>
                <br /> <br /><input className="output" type="text" value={curColor} READONLY /><br />
            </div>
            <p className='title-roughness'>Brightness Blue:</p>
            <input type="range" min="0" max="100" step="10" onInput="this.nextElementSibling.value = this.value"
                value={coef} onChange={(e) => { setCoef(e.target.value) }} />
            <output>{coef}</output><br />
            <div className="changereset">
                <button id="changebtn" className="colorschemebtn" onClick={changeV_ON_BLUE_HSV}>Change</button>
                <button id="resetbtn" className="colorschemebtn" onClick={returnPhoto}>Reset</button>
            </div>
            <div className="uploadsave">
                <label className="custom-file-upload">
                    <input type="file" accept="image/*" onChange={handleImage} />
                    <img src="./images/upload.png" alt="Upload" width={20} height={20}></img> Upload
                </label>
                <button className="colorschemebtn" onClick={() => { saveCanvasImage() }}><img src="./images/download.png" alt="Save" width={20} height={20}></img> Save</button>
            </div>
        </div>
    );
};

export default ColorSchemeSettings;