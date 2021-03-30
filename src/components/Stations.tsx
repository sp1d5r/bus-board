/*
    STATION LIST
*/
import React from 'react';
import {Link} from 'react-router-dom';
import type {Station} from '../api';

interface Props {
    stations:Station[]
}

const Stations = ({stations}:Props) => {
    return (
        <>
        {
        stations.map(station => (
            <h3 key={station.id} className="lead"><Link to={`/${station.id}`}>{station.commonName}</Link></h3>
        ))
        }
        </>
    )
}

export default Stations;