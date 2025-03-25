'use client'
import { useEffect, useRef } from "react";
import { Endereco } from "@/@types/types";
import { adressToString, getStaticMapUrl } from "@/scripts/globais";
import Image from "next/image";
import styles from './mapsViewer.module.css';

type Props = {
    data?: Endereco,
    label: 'localInicio' | 'localFim',
    readonly: boolean,
    reset?: boolean,
    setLatLong: (
        lat: number,
        lng: number,
        label: 'localInicio' | 'localFim',
        adress?: string
    ) => void
}
export default function MapsComponent ({label, data, readonly, reset, setLatLong}:Props){
    const mapRef = useRef<HTMLDivElement | null>(null);
    const zoom = 18;

    const loadMapAddress = async()=>{
        if(!mapRef.current)return;
        if(!data) return;

        const geocoder = new google.maps.Geocoder();
        // inicialização do mapa com o marcador central
        const mapOptions: google.maps.MapOptions= {
            center: {lat: -19.932268, lng: -40.140781}, // Localização padrão inicial (Coqueiral de Aracruz),
            zoom,
            mapId: `MY_NEXTJS_MAPID_${label}`,
            clickableIcons: true
        };
        const map = new google.maps.Map(mapRef.current, mapOptions);
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        map.setCenter(mapOptions.center);
        
        if(data.coordenadas?.lat && data.coordenadas.long){
            new AdvancedMarkerElement({
                position: {lat: data.coordenadas.lat, lng: data.coordenadas.long},
                map: map,
            });
            map.setCenter({lat: data.coordenadas.lat, lng: data.coordenadas.long});  
        }else{
            //seta o endereço inicial apartir do endereço informado no formulário.
            const address = adressToString(data);
            if(address){
                console.log("entrou no marcador pelo endereço")
                geocoder.geocode({ 
                    address,
                    language: 'pt-BR',
                    region: 'BR'
                }, async(results, status) => {
                    if (status === "OK") {
                        if(!results) return;

                        //console.log("resultados encontrados pelo endereço", results)
                        // Filtrar por tipos de local mais precisos
                        const preciseResult = results.find(result => 
                            result.types.includes("street_address") || 
                            result.types.includes("premise")
                        ) || results[0];

                        const clickedAddress = preciseResult.formatted_address;
                        console.log('Endereço mais preciso:', clickedAddress);

                        const location = preciseResult.geometry.location;  
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
        }
        if(!readonly){
            map.addListener("click", (e) => {
            const latLng = e.latLng;

                // Converte as coordenadas para um endereço
                const coord = {lat: parseFloat(latLng.lat()), lng: parseFloat(latLng.lng())};

                // console.log('coordenadas clicada', coord)
                geocoder.geocode({ location: coord, language: 'pt-BR', region: 'BR' }, (results, status) => {
                    if (status === "OK") {
                        if (results && results[0]) {
                            // Filtrar por tipos de local mais precisos
                            //console.log("resultados encontrados no clique", results)
                            const preciseResult = results.find(result => 
                                result.types.includes("route")
                            );
                            let clickedAddress1 = preciseResult.formatted_address;
                            console.log("primeiro endereço recebido", clickedAddress1);

                            //pegar um endereço mais completo.
                            const stretAddress = results.find(result =>
                                result.types.includes("street_address")
                            );
                            if (!clickedAddress1 && stretAddress) {
                                clickedAddress1 = stretAddress.formatted_address;
                                console.log("segundo endereço recebido", clickedAddress1);
                            }
                            
                            // Se não houver um endereço exato, usar o Plus Code
                            const plusCode = results[0].plus_code;
                            if (!clickedAddress1 && plusCode) {
                                clickedAddress1 = plusCode.compound_code;
                                console.log("terceiro endereço recebido", clickedAddress1);
                            }
                            // console.log('Endereço mais preciso:', clickedAddress1);
                            
                            // const clickedAddress = results[0].formatted_address;
                            // Atualiza o estado ou faz algo com o endereço encontrado
                            // console.log('endereço errado', clickedAddress)
                            map.setCenter({lat: coord.lat, lng: coord.lng});
                            setLatLong(coord.lat, coord.lng, label, clickedAddress1);
                            new AdvancedMarkerElement({
                                position: coord,
                                map: map,
                            });
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

    },[reset]);

    return(
        <div style={{width: '100vw', marginBottom: '30px'}}>
            <h1>Localização {label === "localInicio" ? 'Início' : 'Fim'}</h1>
            <h6>{
                data?.address ? data.address : adressToString(data)
            }</h6>
            {!readonly ? 
                <div ref={mapRef} className={styles.map}></div> 
            : <Image 
                alt="mapa"
                width={600}
                height={400}
                style={{objectFit: 'contain'}}
                src={getStaticMapUrl(data.coordenadas?.lat, data.coordenadas?.long, label === "localInicio" ? 'Início' : 'Fim')}
                priority={true}
                loading="eager"
            />}
        </div>
    )
}