import React, { useState } from 'react';
import { Button } from 'Components/FormElements';
import Modal from 'Components/Modal';
import Card from 'Components/Card';
import Map from 'Components/Map';
import './styles.scss';

const PlaceItem = ({ id, title, description, address, coordinates, image }) => {
    const [showMap, setShowMap] = useState(false);

    const openMap = () => setShowMap(true);

    const closeMap = () => setShowMap(false);

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
                        <Button to={`/places/${id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
            <Modal
                show={showMap}
                header={address}
                footer={<Button onClick={closeMap}>CLOSE</Button>}
                onCancel={closeMap}
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
