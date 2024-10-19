import {
    AdvancedMarker,
    APIProvider,
    Map,
    Pin,
} from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";

const API_KEY=import.meta.env.VITE_API_KEY
const MAP_ID=import.meta.env.VITE_MAP_ID

export default function App() {

    const [latLng, setLatLng] = useState();
    const handleClick = useCallback((ev) => {
        setLatLng(ev.detail.latLng);
    });

    return (
        <>
            <form>
                <label>Latitud</label>
                <input type="text" name="lat" value={latLng?.lat}></input>
                <br></br>
                <label>Longitud</label>
                <input type="text" name="lng" value={latLng?.lng}></input>
            </form>
            <APIProvider
                apiKey={API_KEY}
                onLoad={() => console.log("Maps API has loaded.")}
            >
                <div style={{ height: "500px", width: "100%" }}>
                    <Map
                        defaultZoom={13}
                        defaultCenter={{ lat: -12.040426, lng: -77.043989 }}
                        onCameraChanged={(ev) =>
                            console.log(
                                "camera changed:",
                                ev.detail.center,
                                "zoom:",
                                ev.detail.zoom
                            )
                        }
                        mapId={MAP_ID}
                        onClick={handleClick}
                    >
                        { latLng && 
                            <AdvancedMarker
                                key={"point"}
                                position={{ lat: latLng.lat, lng: latLng.lng }}
                            >
                                <Pin></Pin>
                            </AdvancedMarker>
                        }
                    </Map>
                </div>
            </APIProvider>
        </>
    );
}
