import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type Props = {
    lat: number,
    long: number,
    setLatLong: (
        lat: number,
        lng: number
    ) => void
}
export default function MapsComponent ({lat, long, setLatLong}:Props){
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [latLng, setLatLng] = useState({} as {lat: number, lng: number})
    
    useEffect(()=>{
        if(isNaN(latLng.lat) || isNaN(latLng.lng)) return;
        
        const unitMap = async ()=>{
            try{
                const loader = new Loader({
                    apiKey: `${process.env.NEXT_PUBLIC_API_KEY_GOOGLE}`,
                    version: 'quarterly'
                });

                const {Map} = await loader.importLibrary('maps') as google.maps.MapsLibrary;
                const placeMarkerAndPanTo = async(coor: {lat: number, lng: number})=>{
                    setLatLong(coor.lat, coor.lng);
                    map.setCenter(latLng);
                }             

                const mapOptions: google.maps.MapOptions= {
                    center: latLng,
                    zoom: 17,
                    mapId: 'MY_NEXTJS_MAPID',
                    clickableIcons: true
                };
                
                if(!mapRef.current)return;

                const map = new Map(mapRef.current, mapOptions)
                const {AdvancedMarkerElement} = await loader.importLibrary('marker') as google.maps.MarkerLibrary;
                new AdvancedMarkerElement({
                      position: latLng,
                      map: map,
                });
                
                placeMarkerAndPanTo(latLng);

                map.addListener("click", (e) => {
                    placeMarkerAndPanTo({lat: e.latLng.lat(), lng: e.latLng.lng()});
                });
            }
            catch(e){
                console.log(e)
                console.log("dados inválidos.")
            }
        }
        unitMap();
    },[latLng])
    
    useEffect(()=>{
        if(isNaN(lat) || isNaN(long)){
            return;
        }

        setLatLng({lat: lat, lng: long})
    },[lat, long]);

    return(
        <div style={{width: '100vw'}}>
            <h1>Localização</h1>
            <div ref={mapRef} style={{height: '500px', width: "100%"}}></div>
        </div>
    )
}