declare module 'react-map-gl' {
  import { ComponentType } from 'react';
  
  export interface MapProps {
    mapboxAccessToken?: string;
    initialViewState?: {
      longitude: number;
      latitude: number;
      zoom: number;
    };
    style?: React.CSSProperties;
    mapStyle?: string;
    children?: React.ReactNode;
  }
  
  export interface MarkerProps {
    longitude: number;
    latitude: number;
    children?: React.ReactNode;
  }
  
  const Map: ComponentType<MapProps>;
  export const Marker: ComponentType<MarkerProps>;
  export default Map;
}