import React from "react";
import JXG from "jsxgraph";
import { useState } from "react";
import { useEffect, useRef } from "react";

const AffineTransformationsSettings = () => {
    
    const [x1, setX1] = useState(8);
    const [y1, setY1] = useState(1);
    const [x2, setX2] = useState(7);
    const [y2, setY2] = useState(3);
    const [x3, setX3] = useState(6);
    const [y3, setY3] = useState(2);
    const [step, setStep] = useState(1);

    const PointA = useRef();
    const PointB = useRef();
    const PointC = useRef();
    const Board = useRef();
    useEffect(() => {
        var brd = JXG.JSXGraph.initBoard("affineCanvas", {
            maxboundingbox: [-100, 100, 100, -100],
            boundingbox: [-8, 8, 8, -8],
            zoom: {
                enabled: true,
                factorX: 1.25,
                factorY: 1.25,
                wheel: true,
                needShift: false,
                pinchHorizontal: true,
                pinchVertical: true,
                pinchSensitivity: 7,
            },
            pan: {
                needShift: false,
                needTwoFingers: false,
                enabled: true,
            },
        });

        brd.create(
            "axis",
            [
                [0, 0],
                [0, 1],
            ],
            {
                ticks: {
                    drawLabels: true,
                    strokeColor: "black",
                    label: {
                        offset: [-4, -15],
                        strokeColor: "black",
                    },
                },
            }
        );

        brd.create(
            "axis",
            [
                [0, 0],
                [1, 0],
            ],
            {
                ticks: {
                    drawLabels: true,
                    strokeColor: "black",
                    label: {
                        offset: [-4, -15],
                        strokeColor: "black",
                    },
                },
            }
        );

        var p1 = brd.create("point", [x1, y1]);
        var p2 = brd.create("point", [x2, y2]);
        var p3 = brd.create("point", [x3, y3]);
        Board.current = brd;
        PointA.current = p1;
        PointB.current = p2;
        PointC.current = p3;
        brd.create("polygon", [p1, p2, p3]);
    }, []);

    useEffect(() => {
        PointA.current.setPosition(JXG.COORDS_BY_USER, [x1, y1]);
        PointB.current.setPosition(JXG.COORDS_BY_USER, [x2, y2]);
        PointC.current.setPosition(JXG.COORDS_BY_USER, [x3, y3]);
        Board.current.update();
        console.log(PointA.current[0]);
    }, [x1, x2, x3, y1, y2, y3]);

    //   function createXY() {
    //     var XYM = [
    //       [0, 1],
    //       [1, 0],
    //     ];
    //     return XYM;
    //   }

    function rotate(angel) {
        //Функція що повертає матрицю повороту
        angel *= Math.PI / 180;
        var rotateMatrix = [
            [Math.cos(angel), Math.sin(angel), 0],
            [-Math.sin(angel), Math.cos(angel), 0],
            [0, 0, 1]
        ];
        return rotateMatrix;
    }
    const multiplyMatrices = (a, b) => {
        if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
            throw new Error("arguments should be in 2-dimensional array format");
        }
        let x = a.length,
            z = a[0].length,
            y = b[0].length;
        if (b.length !== z) {
            // XxZ & ZxY => XxY
            throw new Error(
                "number of columns in the first matrix should be the same as the number of rows in the second"
            );
        }
        let productRow = Array.apply(null, new Array(y)).map(
            Number.prototype.valueOf,
            0
        );
        let product = new Array(x);
        for (let p = 0; p < x; p++) {
            product[p] = productRow.slice();
        }
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                for (let k = 0; k < z; k++) {
                    product[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return product;
    };

    // change step(x,y) last row [x,y,1]
    const getMoveMatrix = (step) => {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [step, step, 1]
        ]
    }

    const getRotateMatrix = (angel) => {
        angel *= Math.PI / 180;
        var rotateMatrix = [
            [Math.cos(angel), Math.sin(angel), 0],
            [-Math.sin(angel), Math.cos(angel), 0],
            [0, 0, 1]
        ];
        return rotateMatrix;
    }

    const getTriangleMatrix = () => {
        return [
            [x1, y1, 1],
            [x2, y2, 1],
            [x3, y3, 1]
        ]
    }

    const complexTransform = () => {
        let res = multiplyMatrices(getTriangleMatrix(), getMoveMatrix(step));
        res = multiplyMatrices(res, getRotateMatrix(30));
        setCoordsFromMatrix(res)
    }

    const moveTransform = () => {
        let res = multiplyMatrices(getTriangleMatrix(), getMoveMatrix(step));
        setCoordsFromMatrix(res);
    }

    const rotateTransform = () => {
        let res = multiplyMatrices(getTriangleMatrix(), getRotateMatrix(30));
        setCoordsFromMatrix(res);
    }


    const setCoordsFromMatrix = (triangleMatrix) => {
        setX1(triangleMatrix[0][0]);
        setY1(triangleMatrix[0][1]);
        setX2(triangleMatrix[1][0]);
        setY2(triangleMatrix[1][1]);
        setX3(triangleMatrix[2][0]);
        setY3(triangleMatrix[2][1]);
    }

    const round = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }

    return (
        <div className="settings">
            <form id="input" className="instruct">
                A:{" "}
                <label className="lblcoord" htmlFor="1x">X{" "}</label>

                <input
                    type="number"
                    id="1x"
                    className="coords"
                    value={round(x1)}
                    onChange={(e) => {
                        setX1(parseFloat(e.target.value));
                    }}
                />
                <label className="lblcoord" htmlFor="1y">Y{" "}</label>
                <input
                    type="number"
                    id="1y"
                    className="coords"
                    value={round(y1)}
                    onChange={(e) => {
                        setY1(parseFloat(e.target.value));
                    }}
                />
                <br />
                B:{" "}
                <label className="lblcoord" htmlFor="2x">X{" "}</label>
                <input
                    type="number"
                    id="2x"
                    className="coords"
                    value={round(x2)}
                    onChange={(e) => {
                        setX2(parseFloat(e.target.value));
                    }}
                />
                <label className="lblcoord" htmlFor="2y">Y{" "}</label>
                <input
                    type="number"
                    id="2y"
                    className="coords"
                    value={round(y2)}
                    onChange={(e) => {
                        setY2(parseFloat(e.target.value));
                    }}
                />
                <br />
                C:{" "}
                <label className="lblcoord" htmlFor="3x">X{" "}</label>
                <input
                    type="number"
                    id="3x"
                    className="coords"
                    value={round(x3)}
                    onChange={(e) => {
                        setX3(parseFloat(e.target.value));
                    }}
                />
                <label className="lblcoord" htmlFor="3y">Y{" "}</label>
                <input
                    type="number"
                    id="3y"
                    className="coords"
                    value={round(y3)}
                    onChange={(e) => {
                        setY3(parseFloat(e.target.value));
                    }}
                />
                <br></br>
            </form>

            Step:<br/>
            <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={step}
                onChange={(e) => {
                    setStep(e.target.value);
                }}
            />
            <output>{step}</output>

            <input
                type="button"
                id="build_butt"
                onClick={() => {
                    complexTransform();
                }}
                value="Transform"
                className="transform"
            />

            <div className="operations">
                <input
                    type="button"
                    id="build_butt"
                    onClick={() => {
                        rotateTransform();
                    }}
                    value="Rotate"
                />

                <input
                    type="button"
                    id="build_butt"
                    onClick={() => {
                        moveTransform(step);
                    }}
                    value="Move"
                />

            </div>
        </div>
    );
};

export default AffineTransformationsSettings;