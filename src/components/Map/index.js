import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import './styles.scss';

const Map = ({ center, zoom, className }) => {
    const mapReference = useRef();

    useEffect(() => {
        new window.ol.Map({
            target: mapReference.current.id,
            layers: [
                new window.ol.layer.Tile({
                    source: new window.ol.source.OSM()
                })
            ],
            view: new window.ol.View({
                center: window.ol.proj.fromLonLat([center.lng, center.lat]),
                zoom: zoom
            })
        });
    }, [center, zoom]);

    return (
        <div
            id='map'
            ref={mapReference}
            className={clsx('map', { [className]: !!className })}
        ></div>
    );
};

export default Map;
