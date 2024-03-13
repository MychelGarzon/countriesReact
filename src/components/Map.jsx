import React, { useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";

const Map = ({ latlng }) => {
    useEffect(() => {
        if (latlng) {
            const map = tt.map({
                key: 'AXCunYmAUmnmYu2URYfxFCWhCttAF6or',
                container: "map",
                center: [latlng[1], latlng[0]],
                zoom: 3,
            });

            map.on('load', () => {
                new tt.Marker().setLngLat([latlng[1], latlng[0]]).addTo(map);
            });
        }
    }, [latlng]);

    return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default Map;