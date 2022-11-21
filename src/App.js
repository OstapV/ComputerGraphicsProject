import React from 'react';
import { Route, Routes} from "react-router-dom";
import ColorSchemePage from './pages/ColorSchemePage';
import FractalPage from './pages/FractalPage';
import HelpPage from './pages/HelpPage';
import HomePage from './pages/HomePage';
import AffineTransformationsPage from './pages/AffineTransformationsPage';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/fractal" element={<FractalPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/colorscheme" element={<ColorSchemePage />}></Route>
          <Route path="/help" element={<HelpPage />}></Route>
          <Route path="/affine" element={<AffineTransformationsPage />}></Route>
        </Routes>
    </div>
  );
}

export default App;
