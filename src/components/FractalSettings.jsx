import React from 'react'
import Form from 'react-bootstrap/Form';
import PlasmaSettings from './PlasmaSettings';
import BrownianMotionSettings from './BrownianMotionSettings';

const FractalSettings = ({iterations, changeIterations, build, buildFractal, color, 
    changeColor, roughness, changeRoughness, typeOfPlasma, changeTypeOfPlasma, settings, changeSettings,
    opacity, changeOpacity, brownianColor, changeBrownianColor, brownianFrames, changeBrownianFrames, dotsCount, changeDotsCount}) => {

   
    console.log(10);

    function saveCanvasImage()
    {
        const cvs = document.getElementById("canvas");
        const link = document.createElement('a');
        link.download = 'fractal.png';
        link.href = cvs.toDataURL();
        link.click();
    }

    return(
        <div className="settings">
        <Form.Select className='select-fractal'
        value={settings} onChange={(e) => {changeSettings(e.target.value)}}>
            <option selected value="1">Plasma</option>
            <option value="2">Brownian Motion</option>
        </Form.Select>
            <>
            {settings === '1' && <PlasmaSettings iterations={iterations} changeIterations={changeIterations}
            color={color} changeColor={changeColor} roughness={roughness} changeRoughness={changeRoughness}
            typeOfPlasma={typeOfPlasma} changeTypeOfPlasma={changeTypeOfPlasma}/> }
            {settings === '2' && <BrownianMotionSettings opacity={opacity} changeOpacity={changeOpacity} 
            brownianColor={brownianColor} changeBrownianColor={changeBrownianColor} 
            brownianFrames={brownianFrames} changeBrownianFrames={changeBrownianFrames} dotsCount={dotsCount} changeDotsCount={changeDotsCount}/>}
            </>
            <br/>            

            <button value={build} onClick={() => {buildFractal(!build)}}>
                Build
            </button>
            <button onClick={() => {saveCanvasImage()}}><img src="./images/download.png" alt="Save" width={20} height={20}></img> Save</button>
        </div>
    );
};

export default FractalSettings;