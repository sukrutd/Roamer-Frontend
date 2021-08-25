import React, { useContext, useState } from 'react';
import { AuthContext } from 'Context/AuthContext';
import { Button } from 'Components/FormElements';
import Modal from 'Components/Modal';
import Card from 'Components/Card';
import Map from 'Components/Map';
import './styles.scss';

const PlaceItem = ({ id, title, description, address, coordinates, image }) => {
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const openMap = () => setShowMap(true);

    const closeMap = () => setShowMap(false);

    const showDeleteWarningModal = () => setShowConfirmationModal(true);

    const closeDeleteWarningModal = () => setShowConfirmationModal(false);

    const deletePlace = () => {
        closeDeleteWarningModal();

        // eslint-disable-next-line no-console
        console.log('Deleted...');
    };

    return (
        <>
            <li className='place-item'>
                <Card className='place-item__content'>
                    <div className='place-item__image'>
                        <img src={image} alt={title} />
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
                        {auth.isLoggedIn && (
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
