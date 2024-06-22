import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onUpload }) => {
    const onDrop = useCallback((acceptedFiles, type) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                onUpload(reader.result, type); // Pass the base64 encoded image data and type
            };
            reader.readAsDataURL(file);
        });
    }, [onUpload]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'human'),
    });

    const { getRootProps: getRootPropsFabric, getInputProps: getInputPropsFabric } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'fabric'),
    });

    return (
        <div className="image-upload">
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag 'n' drop or click to select Human with Dress image</p>
            </div>
            <div {...getRootPropsFabric()} className="dropzone">
                <input {...getInputPropsFabric()} />
                <p>Drag 'n' drop or click to select Fabric image</p>
            </div>
        </div>
    );
};

export default ImageUpload;




