import React from 'react';
import LocationPicker from 'react-leaflet-location-picker';
import "./MapPicker.css";

const MapPicker = ({ onSearchChange, weather }) => {
    const pointVals = [[weather.data.coord.lat, weather.data.coord.lon]];
    const pointMode = {
        banner: false,
        control: {
            values: pointVals,
            onClick: point => {
                onSearchChange({
                    label: undefined,
                    value: `${point[0]} ${point[1]}`,
                })
            }
            ,
            onRemove: point => console.log(point, "removed 😼")
        }
    }

    return (
        <LocationPicker pointMode={pointMode} />
    )
}

export default MapPicker