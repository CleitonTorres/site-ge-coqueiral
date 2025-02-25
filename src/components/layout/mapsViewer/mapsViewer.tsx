'use client'
import { useEffect, useRef } from "react";
import { Endereco } from "@/@types/types";
import styles from './mapsViewer.module.css';

type Props = {
    data?: Endereco,
    label: 'localInicio' | 'localFim',
    readonly: boolean,
    setLatLong: (
        lat: number,
        lng: number,
        label: 'localInicio' | 'localFim',
        adress?: string
    ) => void
}
export default function MapsComponent ({label, data, readonly, setLatLong}:Props){
    const mapRef = useRef<HTMLDivElement | null>(null);
    
    const loadMapAddress = async()=>{
        if(!mapRef.current)return;
        if(!data) return;

        const geocoder = new google.maps.Geocoder();

        const mapOptions: google.maps.MapOptions= {
            center: data.coordenadas?.lat && data.coordenadas.long ? {lat: data.coordenadas?.lat, lng: data.coordenadas.long} : { lat: -23.55052, lng: -46.633308 }, // Localização padrão inicial (São Paulo),
            zoom: 19,
            mapId: `MY_NEXTJS_MAPID_${label}`,
            clickableIcons: true
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);
        
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
 

        new AdvancedMarkerElement({
            position: mapOptions.center,
            map: map,
        });
        
        const address = `${data.logradouro}, ${data.bairro}, ${data.municipio}, ${data.uf}, ${data.cep}`
        
        if(!data.coordenadas?.lat ||  !data.coordenadas?.long){
            console.log("entrou no marcador pelo endereço")
            geocoder.geocode({ address }, async(results, status) => {
                if (status === "OK") {
                    if(!results) return;

                    const location = results[0].geometry.location;
                    map.setCenter(location);                
                    setLatLong(location.lat(), location.lng(), label)
                    new AdvancedMarkerElement({
                        position: location,
                        map: map,
                    });
                } else {
                    console.error("Geocoding falhou: " + status);
                }
            }); 
        }

        if(!readonly){
            map.addListener("click", (e) => {
            const latLng = e.latLng;

            // Converte as coordenadas para um endereço
            const coord = {lat: parseFloat(latLng.lat()), lng: parseFloat(latLng.lng())};

            console.log('coordenadas clicada', coord)
            geocoder.geocode({ location: coord, language: 'pt-BR', region: 'BR' }, (results, status) => {
                if (status === "OK") {
                    if (results && results[0]) {
                        const clickedAddress = results[0].formatted_address;

                        // Atualiza o estado ou faz algo com o endereço encontrado
                        console.log('endereço', clickedAddress)
                        setLatLong(coord.lat, coord.lng, label, clickedAddress);
                    } else {
                        console.warn("Nenhum endereço encontrado para esta localização.");
                    }
                } else {
                    console.error("Erro ao buscar o endereço: " + status);
                }
            });
            
            });
        }
    }

    useEffect(()=>{
        if(!data){
            return;
        }

        loadMapAddress()

    },[data]);

    return(
        <div style={{width: '100vw', marginBottom: '30px'}}>
            <h1>Localização {label === "localInicio" ? 'Início' : 'Fim'}</h1>
            <h6>{
                data?.address ? data.address : `${data?.logradouro}, ${data?.bairro}, ${data?.municipio}, ${data?.uf}, ${data?.cep}`
            }</h6>
            <div 
                ref={mapRef} 
                style={{height: '500px', width: "100%"}}
                className={styles.nobreak}></div>
        </div>
    )
}