/* 
    STATION PAGE
*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import {getArrivalsFromStationId} from "../api"
import type {Station, Arrival} from '../api';
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";


interface Props {
    stations: Station[]
}


export default function StationPage(props: Props) {
    const {stationId} = useParams<{stationId:string}>();
    const station = props.stations.find(st => st.id === stationId);
    const [arrivals, setArrivals] = useState<Arrival[]>([]);
    const [error, setError] = useState<string>('Loading');

    /*
    Gets the arrival times from the api.js and runs when the stationId changes.
    */
    useEffect(() => {
        (async () => {
            try {
                const arrivals = await getArrivalsFromStationId(stationId);
                if (arrivals.length === 0) {
                    setError("We couldn't find any upcoming arrivals for this station.")
                    return
                }
                arrivals.sort((a, b) => a.expectedArrival.localeCompare(b.expectedArrival));
                setArrivals(arrivals);
                setError('');
            } catch {
                setError('Bad connection, try again later.')
            }
        })()
    }, [stationId])

    return (
        <>
        <small><Link to="/">Back</Link></small>
        <h3>{station ? station.commonName : "Station"}</h3>
        <Table striped>
            <thead>
                <th>#</th>
                <th>Destination</th>
                <th>Expected Arrival Here</th>
            </thead>
            <tbody>
                {error && (
                    <tr>
                        <td colSpan={3}>
                            {error}
                        </td>
                    </tr>
                )}
                {
                        arrivals.map((arrival, i) => (
                            <tr key={arrival.id}>
                                <th scope="row">{i+1}</th>
                                <td>{arrival.destinationName}</td>
                                <td>{new Date(arrival.expectedArrival).toLocaleTimeString()}</td>
                            </tr>
                        ))
                }
            </tbody>
        </Table>
        </>
    )
}