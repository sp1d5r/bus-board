/* 
    STATION PAGE
*/
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router"
import {getArrivalsFromStation} from "../api"
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";


export default function StationPage(props) {
    const {stationId} = useParams();
    const station = props.stations.find(st => st.id === stationId);
    const [arrivals, setArrivals] = useState(null);
    const [error, setError] = useState('Loading');

    /*
    Gets the arrival times from the api.js and runs the first time the 
    station page is loaded.
    */
    useEffect(() => {
        (async () => {
            try {
                const arrivals = await getArrivalsFromStation(stationId);
                if (arrivals.length === 0) {
                    setError("We couldn't find any upcoming arrivals for this station.")
                    return
                }
                arrivals.sort((a, b) => a.expectedArrival.localeCompare(b.expectedArrival));
                setArrivals(arrivals);
                setError(null);
            } catch {
                setError('Bad connection, try again later.')
            }
        })()
    }, [])

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
                {error ? (
                    <tr>
                        <td colSpan="3">
                            {error}
                        </td>
                    </tr>
                ) : (
                        arrivals.map((arrival, i) => (
                            <tr key={arrival.id}>
                                <th scope="row">{i+1}</th>
                                <td>{arrival.destinationName}</td>
                                <td>{new Date(arrival.expectedArrival).toLocaleTimeString()}</td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
        </>
    )
}