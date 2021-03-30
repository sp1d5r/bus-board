export function getCoordFromPostcode(postcode) {
    return fetch(`http://api.postcodes.io/postcodes/${postcode}`)
      .then((resp) => resp.json());
  }

export function getStationsFromCoord(coord){
    return fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${coord.latitude}&lon=${coord.longitude}&stopTypes=NaptanRailStation&radius=1500`)
      .then((resp) => resp.json())
      .then((json) => json.stopPoints);
  }

export function getArrivalsFromStation(stationId) {
    return fetch(`https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals`).then((resp) => resp.json());
  }