/*
    STATION LIST
*/
export default function Stations(props){
    return (
        <>
        {
        props.stations.map(station => (
            <h3 key={station.id} className="lead"><a href={`/${station.id}`}>{station.commonName}</a></h3>
        ))
        }
        </>
    )
}