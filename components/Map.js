import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'tailwind-react-native-classnames'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeDestination } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_APIKEY} from '@env';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination=useSelector(selectDestination)
    const mapRef=useRef(null)
    const dispatch=useDispatch();

    useEffect(()=>{
     if(!origin || !destination) return;
     mapRef.current.fitToSuppliedMarkers(['origin','destination'],
     {
        edgePadding:{top:50,right:50,bottom:50,left:50}
     }
     )
    },[origin,destination])

   useEffect(()=>{
    if(!origin || !destination)
        return;
        const getTravelTime=async ()=>{
            
            const encodedOrigin = encodeURIComponent(origin.description);
            const encodedDestination = encodeURIComponent(destination.description);
            
            const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${encodedDestination}&origins=${encodedOrigin}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`;
            
            fetch(apiUrl)
              .then((res) => res.json())
              .then((data) => {
                dispatch(setTravelTimeDestination(data.rows[0].elements[0]))
              })
              .catch((error) => {
                console.error('Error fetching and parsing data:', error);
              });
            
  
        }
    getTravelTime();
   },[origin,destination,GOOGLE_MAPS_APIKEY])

    return (
       <MapView
       ref={mapRef}
           style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}>
          {origin && destination &&(
          <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor='black'
          />
          )}

          {origin?.location && (
            <Marker
            coordinate={{
                latitude:origin.location.lat,
                longitude:origin.location.lng
            }}
            title='Origin'
            description={origin.description}
            identifier='origin'
            />
          )}

           {destination?.location && (
            <Marker
            coordinate={{
                latitude:destination.location.lat,
                longitude:destination.location.lng
            }}
            title='Destination'
            description={destination.description}
            identifier='destination'
            />
          )}
       </MapView>
    );
}

export default Map;
