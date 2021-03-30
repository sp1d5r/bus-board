/*
    HOME PAGE
*/
import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {getCoordFromPostcode, getStationsFromCoord} from '../api.js'
import Stations from './Stations.js';

/* Style Sheets */
const backgroundStyleSheet = {height:"500px", width:"100%"}

export default function Home(props){
    const inputRef = useRef(null);
    const [error, setError] = useState(null);

    /* Postcode Form handler
     - Calls the api.js file to get the station information and passes 
       the station information to top level hook in App.js.
     */
    async function onSubmit(e){
        e.preventDefault();
        const postcode = inputRef.current.value;
        
        try {
            const postcodeInfo = await getCoordFromPostcode(postcode)
        
            if (postcodeInfo.error) {
                setError(postcodeInfo.error)
                return;
            }
            
            const stations = await getStationsFromCoord(postcodeInfo.result)

            if (stations.length === 0) {
                setError("There are no stations near that postcode, sorry.");
                return;
            }

            setError(null);
            
            props.setStations(stations)
            console.log(stations)
        } catch {
            setError("There was an enexpected error, check your internet connection!")
        }
    }

    return (
        <div className="background" style={backgroundStyleSheet}>
            <h3 className="mt-3">
                Enter your postcode:
            </h3>
            {/* Submittion form for postcode*/}
            <Form onSubmit={onSubmit}>
                <InputGroup>
                    <Form.Control type="text" placeholder="Postcode" ref={inputRef} />
                    <InputGroup.Append>
                        <Button type="submit">Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
                {
                    error && (<p className="text-danger">{error}</p>)
                }
            </Form>
            
            {/* Station Information*/}
            <h3 className="mt-4">
                Stations
            </h3>
            {props.stations.length ? <Stations stations={props.stations} /> : "No Stations"}
        </div>
    );
}