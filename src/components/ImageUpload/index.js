import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'Components/FormElements';
import clsx from 'clsx';
import './styles.scss';

const ImageUpload = ({ id, center, onInput, errorText }) => {
    const [file, setFile] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [previewUrl, setPreviewUrl] = useState();
    const filePickerReference = useRef();

    const pickImageHandler = () => filePickerReference.current.click();

    const changeHandler = (event) => {
        const files = event.target.files;
        let fileIsValid = isValid;
        let pickedFile;

        if (files || files.length === 1) {
            pickedFile = files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        onInput(id, pickedFile, fileIsValid);
    };

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => setPreviewUrl(fileReader.result));
        fileReader.readAsDataURL(file);
    }, [file]);

    return (
        <div className='form-control'>
            <input
                id={id}
                type='file'
                accept='.jpg,.png,.jpeg'
                style={{ display: 'none' }}
                onChange={changeHandler}
                ref={filePickerReference}
            />
            <div className={clsx('image-upload', { center })}>
                <div className='image-upload__preview'>
                    {previewUrl ? (
                        <img src={previewUrl} alt='Preview' />
                    ) : (
                        <p>Please pick an image.</p>
                    )}
                </div>
                <Button type='button' onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
            {!isValid && errorText && <p>{errorText}</p>}
        </div>
    );
};

export default ImageUpload;
