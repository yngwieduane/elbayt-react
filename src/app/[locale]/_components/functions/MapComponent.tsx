"use client";

import Image from "next/image";
import { useState } from "react";
import {AdvancedMarker, APIProvider, Map, Pin} from '@vis.gl/react-google-maps';
import { CustomAdvancedMarker } from "./CustomAdvanceMarker";

interface MapComponentProps {
  latitude?: any;
  longitude?: any;
  fallbackImage: string;
  height: string;
  data?: any;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, fallbackImage,height,data }) => {
  const [hasError, setHasError] = useState(false);
  const mainlat = parseFloat(latitude);
  const mainlng = parseFloat(longitude);
  console.log(data);
  return (
    <div className="mapSection w-full h-full rounded-lg overflow-hidden">
      {latitude && longitude && !hasError ? (
        <div className="advanced-marker-example">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string} libraries={['marker']}>
            <Map
              mapId={'49ae42fed52588c3'}
              mapTypeId='roadmap'
              style={{width: '100%', height: '500px'}}
              defaultCenter={{lat: mainlat, lng: mainlng}}
              defaultZoom={10}
            >
            <CustomAdvancedMarker realEstateListing={{latitude,longitude,fallbackImage}} />
            </Map>
          </APIProvider>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MapComponent;