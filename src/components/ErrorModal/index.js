import React from 'react';
import Modal from 'Components/Modal';
import { Button } from 'Components/FormElements';

const ErrorModal = ({ error, onClear }) => {
    return (
        <Modal
            onCancel={onClear}
            header='An Error Occurred!'
            show={!!error}
            footer={<Button onClick={onClear}>Okay</Button>}
        >
            <p>{error}</p>
        </Modal>
    );
};

export default ErrorModal;
