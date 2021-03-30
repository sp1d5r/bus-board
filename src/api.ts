export interface Station {
    id: string,
    commonName: string
}

export interface Coordinate {
    latitude: string,
    longitude: string
}

export interface CoordAPIResult {
    error ?: string,
    result: Coordinate
}

export interface Arrival {
    expectedArrival: string,
    destinationName: string,
    id: string
}

export function getCoordFromPostcode(postcode: string):Promise<CoordAPIResult> {
    return fetch(`http://api.postcodes.io/postcodes/${postcode}`)
      .then((resp) => resp.json());
  }

export function getStationsFromCoord(coord: Coordinate):Promise<Station[]>{
    return fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${coord.latitude}&lon=${coord.longitude}&stopTypes=NaptanRailStation&radius=1500`)
      .then((resp) => resp.json())
      .then((json) => json.stopPoints);
  }

export function getArrivalsFromStationId(stationId: string):Promise<Arrival[]> {
    return fetch(`https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals`).then((resp) => resp.json());
  }