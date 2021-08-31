import React, { useContext, useState } from 'react';
import { AuthContext } from 'Context/AuthContext';
import { useHttpClient } from 'Hooks/useHttpClient';
import { Button } from 'Components/FormElements';
import LoadingSpinner from 'Components/LoadingSpinner';
import ErrorModal from 'Components/ErrorModal';
import Modal from 'Components/Modal';
import Card from 'Components/Card';
import Map from 'Components/Map';
import './styles.scss';

const PlaceItem = ({
    id,
    title,
    description,
    address,
    coordinates,
    image,
    creatorId,
    onDelete
}) => {
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const openMap = () => setShowMap(true);

    const closeMap = () => setShowMap(false);

    const showDeleteWarningModal = () => setShowConfirmationModal(true);

    const closeDeleteWarningModal = () => setShowConfirmationModal(false);

    const deletePlace = () => {
        closeDeleteWarningModal();

        sendRequest(`http://localhost:5000/api/places/${id}`, 'DELETE', null, {
            Authorization: `Bearer ${auth.token}`
        }).then(() => onDelete(id));
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />

            <li className='place-item'>
                <Card className='place-item__content'>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className='place-item__image'>
                        <img src={`http://localhost:5000/${image}`} alt={title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={openMap}>
                            VIEW ON MAP
                        </Button>
                        {auth.userId === creatorId && (
                            <>
                                <Button to={`/places/${id}`}>EDIT</Button>
                                <Button danger onClick={showDeleteWarningModal}>
                                    DELETE
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>

            <Modal
                show={showConfirmationModal}
                onCancel={closeDeleteWarningModal}
                header='Are you sure?'
                footer={
                    <>
                        <Button inverse onClick={closeDeleteWarningModal}>
                            CANCEL
                        </Button>
                        <Button danger onClick={deletePlace}>
                            DELETE
                        </Button>
                    </>
                }
            >
                <p>
                    Do you want to proceed and delete this place? Please note that it can not be
                    undone thereafter.
                </p>
            </Modal>

            <Modal
                show={showMap}
                onCancel={closeMap}
                header={address}
                footer={<Button onClick={closeMap}>CLOSE</Button>}
                className='place_item__modal-content'
            >
                <div className='map-container'>
                    <Map center={coordinates} zoom={16} />
                </div>
            </Modal>
        </>
    );
};

export default PlaceItem;
