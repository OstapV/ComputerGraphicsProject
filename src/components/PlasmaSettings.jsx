import React from 'react'
import 'toolcool-range-slider';
import Form from "react-bootstrap/Form";
import ColorPicker from './ColorPicker';

const PlasmaSettings = ({ iterations, changeIterations, color, changeColor, roughness, changeRoughness, typeOfPlasma, changeTypeOfPlasma }) => {



     return (

          <div className='plasma-settings'>
               <div className='block-iterations'>
                    <p className='title-iterations'>Iterations:</p>
                    <input type="range" min="1" max="10" step="1" onInput="this.nextElementSibling.value = this.value"
                         value={iterations} onChange={(e) => { changeIterations(e.target.value); console.log("plasmasettingssetter"); }} />
                    <output>{iterations}</output>
               </div>
               <div className='block-roughness'>
                    <p className='title-roughness'>Roughness:</p>
                    <input type="range" min="0" max="100" step="5" onInput="this.nextElementSibling.value = this.value"
                         value={roughness} onChange={(e) => { changeRoughness(e.target.value); console.log("plasmasettingssetter"); }} />
                    <output>{roughness}</output>
               </div>
               <div className='block-plasmatype'>
                    <p className='title-plasmatype'>Plasma type:</p>
                    <Form.Select className='selectTypeOfPlasma'
                         value={typeOfPlasma} onChange={(e) => { changeTypeOfPlasma(e.target.value) }}>
                         <option value="0">Plasma</option>
                         <option value="1">Cloud</option>
                    </Form.Select>
                    <>
                         {typeOfPlasma === parseInt("0") && <PlasmaSettings iterations={iterations} changeIterations={changeIterations} roughness={roughness} changeRoughness={changeRoughness}
                              typeOfPlasma={typeOfPlasma} changeTypeOfPlasma={changeTypeOfPlasma} />}
                         {typeOfPlasma === parseInt("1") && <PlasmaSettings iterations={iterations} changeIterations={changeIterations} roughness={roughness} changeRoughness={changeRoughness}
                              typeOfPlasma={typeOfPlasma} changeTypeOfPlasma={changeTypeOfPlasma} />}
                    </>
               </div>
               <div className='block-color'>
                    <p className='title-color'>Color:</p>
                    <ColorPicker onChange={e => { changeColor(e.target.value) }} value={color} />
               </div>
          </div>
     );
};

export default PlasmaSettings;