// import React, { useEffect, useRef, useState } from 'react';
// import { fabric } from 'fabric';

// const FabricOverlay = ({ humanImage, fabricImage, onProcessComplete }) => {
//     const canvasRef = useRef(null);
//     const fabricCanvasRef = useRef(null);
//     const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);

//     useEffect(() => {
//         const canvasElement = canvasRef.current;
//         if (!canvasElement) {
//             console.error('Canvas element not found!');
//             return;
//         }

//         const fabricCanvas = new fabric.Canvas(canvasElement);
//         fabricCanvasRef.current = fabricCanvas;
//         setIsCanvasInitialized(true);
//         console.log('Fabric canvas initialized:', fabricCanvas);

//         return () => {
//             if (fabricCanvasRef.current) {
//                 fabricCanvasRef.current.dispose();
//                 console.log('Fabric canvas disposed');
//                 fabricCanvasRef.current = null;
//                 setIsCanvasInitialized(false);
//             }
//         };
//     }, []);

//     useEffect(() => {
//         const loadImage = (url) => {
//             return new Promise((resolve) => {
//                 fabric.Image.fromURL(url, (img) => {
//                     resolve(img);
//                 });
//             });
//         };

//         const addImagesToCanvas = async () => {
//             if (!fabricCanvasRef.current || !isCanvasInitialized) {
//                 console.error('Fabric canvas is not available for image addition');
//                 return;
//             }

//             const fabricCanvas = fabricCanvasRef.current;
//             fabricCanvas.clear();
//             console.log('Fabric canvas cleared');

//             if (humanImage) {
//                 const humanImg = await loadImage(humanImage);
//                 console.log('Human image loaded:', humanImg);
//                 humanImg.set({ selectable: false });
//                 fabricCanvas.add(humanImg);
//             }

//             if (fabricImage) {
//                 const fabricImg = await loadImage(fabricImage);
//                 console.log('Fabric image loaded:', fabricImg);
//                 fabricImg.set({
//                     left: 100,
//                     top: 100,
//                     opacity: 0.7,
//                     selectable: false,
//                 });
//                 fabricCanvas.add(fabricImg);
//             }

//             fabricCanvas.renderAll();
//             console.log('Images added to fabric canvas and rendered');
//             onProcessComplete(fabricCanvas.toDataURL());
//         };

//         addImagesToCanvas();
//     }, [humanImage, fabricImage, isCanvasInitialized, onProcessComplete]);

//     return <canvas ref={canvasRef} width={500} height={500}></canvas>;
// };

// export default FabricOverlay;


import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const FabricOverlay = ({ humanImage, fabricImage, onProcessComplete }) => {
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);

    useEffect(() => {
        const canvasElement = canvasRef.current;
        if (!canvasElement) {
            console.error('Canvas element not found!');
            return;
        }

        const fabricCanvas = new fabric.Canvas(canvasElement);
        fabricCanvasRef.current = fabricCanvas;
        setIsCanvasInitialized(true);
        console.log('Fabric canvas initialized:', fabricCanvas);

        return () => {
            if (fabricCanvasRef.current) {
                fabricCanvasRef.current.dispose();
                console.log('Fabric canvas disposed');
                fabricCanvasRef.current = null;
                setIsCanvasInitialized(false);
            }
        };
    }, []);

    useEffect(() => {
        const loadImage = (url) => {
            return new Promise((resolve) => {
                fabric.Image.fromURL(url, (img) => {
                    resolve(img);
                });
            });
        };

        const addImagesToCanvas = async () => {
            if (!fabricCanvasRef.current || !isCanvasInitialized) {
                console.error('Fabric canvas is not available for image addition');
                return;
            }

            const fabricCanvas = fabricCanvasRef.current;
            fabricCanvas.clear();
            console.log('Fabric canvas cleared');

            if (humanImage) {
                const humanImg = await loadImage(humanImage);
                console.log('Human image loaded:', humanImg);
                humanImg.set({ selectable: false });
                fabricCanvas.add(humanImg);

                if (fabricImage) {
                    const fabricImg = await loadImage(fabricImage);
                    console.log('Fabric image loaded:', fabricImg);

                    // Scale the fabric image to cover the dress area
                    const scaleFactor = humanImg.width / fabricImg.width;
                    fabricImg.scaleToWidth(humanImg.width);
                    fabricImg.scaleToHeight(humanImg.height * 0.9); // Adjust height scale to cover dress only
                    fabricImg.set({
                        left: humanImg.left,
                        top: humanImg.top + humanImg.height * 0.18, // Adjust top to avoid covering the face
                        opacity: 0.7,
                        selectable: false,
                    });

                    fabricCanvas.add(fabricImg);
                }
            }

            fabricCanvas.renderAll();
            console.log('Images added to fabric canvas and rendered');
            onProcessComplete(fabricCanvas.toDataURL());
        };

        addImagesToCanvas();
    }, [humanImage, fabricImage, isCanvasInitialized, onProcessComplete]);

    return <canvas ref={canvasRef} width={500} height={700}></canvas>;
};

export default FabricOverlay;


