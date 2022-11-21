import React, { useState } from 'react'
import 'toolcool-range-slider';
import { ChromePicker } from 'react-color';
import ColorPicker from './ColorPicker';

const BrownianMotionSettings = ({ opacity, changeOpacity, brownianColor, changeBrownianColor, brownianFrames, changeBrownianFrames, dotsCount, changeDotsCount }) => {

    return (
        <div className='brownian-settings'>
            <div className='block-opacity'>
                <p className='title-brownianOpacity'>Opacity:</p>
                <input type="range" min="0.1" max="1" step="0.1" onInput="this.nextElementSibling.value = this.value"
                    value={opacity} onChange={(e) => { changeOpacity(e.target.value); console.log("plasmasettingssetter"); }} />
                <output>{opacity}</output>
            </div>
            <div className='block-brownianIterations'>
                <p className='title-brownianIterations'>Iterations:</p>
                <input type="range" min="0" max="20000" step="2000" onInput="this.nextElementSibling.value = this.value"
                    value={brownianFrames} onChange={(e) => { changeBrownianFrames(e.target.value); console.log("plasmasettingssetter"); }} />
                <output>{brownianFrames}</output>
            </div>
            <div className='block-dots'>
                <p className='title-brownianDots'>Dots:</p>
                <input type="number" min="1" max="30" step="1" onInput="this.nextElementSibling.value = this.value"
                    value={dotsCount} onChange={(e) => { changeDotsCount(e.target.value); console.log("plasmasettingssetter"); }} />
            </div>
            <div className='block-brownianColor'>
                <p className='title-brownianColor'>Color:</p>
                <ColorPicker onChange={e => { changeBrownianColor(e.target.value) }} value={brownianColor} />
            </div>
        </div>
    );

};

export default BrownianMotionSettings;