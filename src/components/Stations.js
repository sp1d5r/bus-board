/*
    STATION LIST
*/
import {Link} from 'react-router-dom';

export default function Stations(props){
    return (
        <>
        {
        props.stations.map(station => (
            <h3 key={station.id} className="lead"><Link to={`/${station.id}`}>{station.commonName}</Link></h3>
        ))
        }
        </>
    )
}