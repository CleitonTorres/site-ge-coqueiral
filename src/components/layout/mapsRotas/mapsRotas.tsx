'use client'
import { Rota } from "@/@types/types";
import { Context } from "@/components/context/context";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./mapsRotas.module.css";
import { FaSave } from "react-icons/fa";

type RouteMapComponentProps = {
    readonly?: boolean;
    initialRota?: Rota | undefined;
    initialPosition: {lat: number, lng: number} | undefined;
    handleRotas?: (rota: Rota) => void;
}
export default function RouteMapComponent({ readonly, initialRota, initialPosition, handleRotas }: RouteMapComponentProps) {
    const context = useContext(Context);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [formRota, setFormRota] = useState({} as Rota);

    //const [points, setPoints] = useState<google.maps.LatLng[]>([]);
    // const [distance, setDistance] = useState<number>(0);    
    const polylineRef = useRef<google.maps.Polyline | null>(null);

    //inicializa o mapa.
    const loadMap = async () => {
        if (!mapRef.current) return;

        const mapOptions: google.maps.MapOptions = {
            center: initialPosition || {lat: -20.319467, lng: -40.331466}, //{ lat: -23.55052, lng: -46.633308 }, // Localização inicial (São Paulo)
            zoom: 14,
            mapId: "MY_NEXTJS_MAPID_ROUTE",
        };
        const map = new google.maps.Map(mapRef.current, mapOptions);    

        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        // Inicializa a Polyline (rota)
        polylineRef.current = new google.maps.Polyline({
            path: [],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: map,
        });

        // Função para calcular a distância total
        const calculateDistance = (points: { lat: number; lng: number }[]): number => {
            if (!google.maps.geometry || !google.maps.geometry.spherical) {
                console.error("Biblioteca geometry não está carregada.");
                return 0;
            }

            let totalDistance = 0;
            for (let i = 0; i < points.length - 1; i++) {
                const start = points[i];
                const end = points[i + 1];
                totalDistance += google.maps.geometry.spherical.computeDistanceBetween(start, end);
            }

            // Distância em quilômetros
            return totalDistance / 1000;
        };

        // Estado local para armazenar os marcadores
        const markers: google.maps.marker.AdvancedMarkerElement[] = [];

        // Função para atualizar a Polyline e a distância
        const updateRoute = (points: { lat: number; lng: number }[]) => {
            if(!points) return;

            // Atualiza a Polyline com os pontos restantes
            if (polylineRef.current) {
                const polylinePath = points.map((point) => new google.maps.LatLng(point.lat, point.lng));
                polylineRef.current.setPath(polylinePath);
            }

            // Atualiza o estado com a nova distância e os pontos
            setFormRota((prev) => ({
                ...prev,
                distance: calculateDistance(points),
                points,
            }));

            console.log('markers', markers)
        };

        // Adiciona um clique no mapa para criar marcadores e calcular rota
        if(!readonly){
            map.addListener("click", (e) => {
            const latLng = e.latLng as google.maps.LatLng;

            if (latLng) {
                // Cria um novo marcador
                const marker = new AdvancedMarkerElement({
                    position: latLng,
                    map: map,
                    gmpDraggable: true,
                    content: (() => {
                        const div = document.createElement("div");
                        div.style.padding = "5px";
                        div.style.borderRadius = "50%";
                        div.style.width = "20px";
                        div.style.height = "20px";
                        div.style.display = "flex";
                        div.style.alignItems = "center";
                        div.style.justifyContent = "center";
                        div.style.backgroundColor = "blue";
                        div.style.color = "white";
                        div.innerText = `${markers.length+1}`;
                        return div;
                    })(),
                });

                 // Atualiza a rota ao soltar o marcador
                marker.addListener("dragend", () => {
                    const updatedPoints = markers.map((m) => {
                        const pos = m.position as google.maps.LatLngLiteral;
                        return { lat: pos.lat, lng: pos.lng };
                    });
                    updateRoute(updatedPoints);
                });
                
                // Adiciona evento para remover o marcador ao clicar nele
                marker.addListener("click", () => {
                    const index = markers.indexOf(marker);
                    if (index > -1) {
                        markers.splice(index, 1); // Remove o marcador da lista
                        marker.map = null; // Remove o marcador do mapa

                        // Remove o ponto correspondente e atualiza a rota
                        const updatedPoints = [...markers.map((m) => {
                            const pos = m.position as google.maps.LatLngLiteral;
                            console.log(pos);
                            return { 
                                lat: pos?.lat, 
                                lng: pos?.lng 
                            }
                        })]
                        .filter((point) => point.lat !== undefined && point.lng !== undefined);
                        updateRoute(updatedPoints);
                    }
                });
                
                // Armazena o marcador
                markers.push(marker);
                
                // Atualiza os pontos e a Polyline
                const updatedPoints = [...markers.map((m) =>{
                    const pos = m.position as google.maps.LatLngLiteral ;
                    console.log("coord", pos);
                    return{ 
                        lat: pos?.lat, 
                        lng: pos?.lng 
                    }
                })]
                .filter((point) => point.lat !== undefined && point.lng !== undefined);
                
                updateRoute(updatedPoints);
            }
            });
        }

        const startInitialRota = async()=>{
            if(mapRef.current === null) return;
            if(map === null) return;

            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    
            // Cria os marcadores iniciais
            formRota.points?.forEach((spots, idx) => {
                const marke = new AdvancedMarkerElement({
                    position: spots,
                    map: map,
                    content: (() => {
                        const div = document.createElement("div");
                        div.style.position = "relative";
                        div.style.padding = "5px";
                        div.style.width = "20px";
                        div.style.height = "20px";
                        div.style.display = "flex";
                        div.style.alignItems = "center";
                        div.style.justifyContent = "center";
                        div.style.borderRadius = "50%";
                        div.style.backgroundColor = "blue";
                        div.style.color = "white";
                        div.innerText = `${idx + 1}`;
                        
                        // Número principal
                        // const titleSpan = document.createElement("span");
                        // titleSpan.innerText = `Ponto ${idx + 1}`;
                        // titleSpan.style.fontSize = "16px";
                        // titleSpan.style.fontWeight = "bold";
                        // titleSpan.style.position = "absolute";
                        // titleSpan.style.bottom = "20px";
                        // titleSpan.style.fontWeight= 'bold';

                        // div.appendChild(titleSpan);
                        return div;
                    })(),
                    title: `Ponto ${idx + 1}`,
                    gmpDraggable: false
                });

                markers.push(marke);
            });
    
            // cria as Polylines iniciais
            if (polylineRef.current && formRota.points) {
                const polylinePath = formRota.points.map((point) => new google.maps.LatLng(point.lat, point.lng)) || [];
                polylineRef.current.setPath(polylinePath);
            }

            // Atualiza a distância inicial e os pontos
            updateRoute(formRota.points);
        }

        if(initialRota){
            startInitialRota();
        }
    }

    useEffect(() => {
        if (!mapRef.current) return;

        loadMap();
    },[]);

    useEffect(() => {
        if(initialRota && mapRef.current){
            console.log(initialRota)
            setFormRota(initialRota);

            loadMap();
        }        
    },[initialRota, mapRef?.current]);

    return (
        <div style={{ width: "100%", marginTop: "30px", zIndex: 10, padding: 20 }}>
            <div 
                onClick={()=>{
                    context.setShowModal(null)
                }} 
                className={styles.closeBtn}
            >
                X
            </div>
            <div style={{ 
                display: "flex", 
                flexDirection: 'column', 
                justifyContent: "space-between",
            }}>
                <label htmlFor="title">Nome da rota</label>
                <input 
                    type="text" 
                    name="title"
                    value={formRota.title || ''}
                    onChange={(e) => setFormRota((prev) => ({ ...prev, title: e.target.value }))}
                />
            </div>
            <div style={{ 
                display: "flex", 
                flexDirection: 'column', 
                justifyContent: "space-between",
            }}>
                <label htmlFor="description">Descrição</label>
                <textarea 
                    name="description" 
                    value={formRota.description || ''}
                    onChange={(e) => setFormRota((prev) => ({ ...prev, description: e.target.value }))}
                />
            </div>
            <p>Distância total: {formRota.distance?.toFixed(2)} km</p>
            <FaSave 
                onClick={()=>{
                    if(handleRotas)
                        handleRotas(formRota);
                        context.setShowModal(null);
                    } 
                }
                size={20}
                color="blue"
                style={{ 
                    position: "absolute",
                    right: 80,
                    top: 10,
                    cursor: "pointer", 
                }}
            />
            <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
        </div>
    );
}
