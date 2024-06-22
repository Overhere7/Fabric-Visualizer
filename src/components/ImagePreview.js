import React from 'react';

const ImagePreview = ({ humanImage, fabricImage, processedImage }) => {
    return (
        <div className="image-preview">
            <div className="original-images">
                <h3>Original Images:</h3>
                {humanImage && <img src={humanImage} alt="Human" />}
                {fabricImage && <img src={fabricImage} alt="Fabric" />}
            </div>
            <div className="processed-image">
                <h3>Processed Image:</h3>
                {processedImage && <img src={processedImage} alt="Processed" />}
            </div>
        </div>
    );
};

export default ImagePreview;
