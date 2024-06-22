import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import FabricOverlay from './components/FabricOverlay';
 import ImagePreview from './components/ImagePreview';
import './styles.css';

const App = () => {
    const [humanImage, setHumanImage] = useState(null);
    const [fabricImage, setFabricImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);

    const handleUpload = (imageData, type) => {
        if (type === 'human') {
            setHumanImage(imageData);
        } else if (type === 'fabric') {
            setFabricImage(imageData);
        }
    };

    const handleProcessComplete = (imageData) => {
        setProcessedImage(imageData);
    };

    return (
        <div className="app">
            <h1>Fabric Visualizer</h1>
            <ImageUpload onUpload={handleUpload} />
            {humanImage && fabricImage && (
                <FabricOverlay
                    humanImage={humanImage}
                    fabricImage={fabricImage}
                    onProcessComplete={handleProcessComplete}
                />
            )}
            <ImagePreview
                humanImage={humanImage}
                fabricImage={fabricImage}
                processedImage={processedImage}
            />
        </div>
    );
};

export default App;

// import ImageUpload from './components/ImageUpload';
// import FabricOverlay from './components/FabricOverlay';
// // import ImagePreview from './components/ImagePreview';


// 

